const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // Import node-fetch for API calls

// Dynamic import for uuid to resolve ERR_REQUIRE_ESM
let uuidv4;

// Google Books API Key (replace with your actual key)
const GOOGLE_BOOKS_API_KEY = 'GOOGLE-API-KEY'; 

async function initializeApp() {
  // Dynamically import uuid
  const { v4 } = await import('uuid');
  uuidv4 = v4; // Assign to the global variable

  // Database setup
  const dbPath = path.join(__dirname, 'db.json');
  let requests = [];

  // Load database if it exists, otherwise initialize an empty one
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    requests = JSON.parse(data).requests || [];
  } catch (e) {
    console.log('db.json not found or empty, initializing new database.');
    // Ensure db.json exists with default structure if it's new
    fs.writeFileSync(dbPath, JSON.stringify({ requests: [] }, null, 2), 'utf8');
  }

  // Database save function
  function saveDatabase() {
    fs.writeFileSync(dbPath, JSON.stringify({ requests }, null, 2), 'utf8');
  }

  const app = express();

  // Middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json()); // Added to parse JSON request bodies
  app.use(express.static('public'));
  app.set('view engine', 'ejs');

  // Routes
  app.get('/', (req, res) => {
    res.render('index', {
      requests: requests
    });
  });

  // Route to handle Google Books API search
  app.get('/search-books', async (req, res) => {
    const query = req.query.q;
    if (!query) {
      console.log('Search query is empty, rendering search page with no results.');
      return res.render('search', { books: [], query: '' });
    }

    try {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${GOOGLE_BOOKS_API_KEY}&maxResults=20`;
      console.log('Fetching from Google Books API URL:', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Google Books API returned status ${response.status}: ${errorText}`);
        return res.render('search', { books: [], query, error: `Google Books API error: ${response.status} - ${errorText.substring(0, 100)}...` });
      }

      const data = await response.json();
      console.log('Raw Google Books API Response:', JSON.stringify(data, null, 2)); // Log raw JSON response

      const books = data.items ? data.items.map(item => ({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
        description: item.volumeInfo.description || 'No description available.',
        thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x190.png?text=No+Image'
      })) : [];

      if (books.length === 0) {
        console.log('No books found in the API response for query:', query);
      } else {
        console.log(`Found ${books.length} books for query:`, query);
      }

      res.render('search', { books, query });
    } catch (error) {
      console.error('Error fetching books from Google Books API:', error);
      res.render('search', { books: [], query, error: 'Failed to fetch books. Please try again later.' });
    }
  });

  app.post('/add-request', (req, res) => { // Handles adding a new book request
    const newRequest = {
      id: uuidv4(),
      name: req.body.name,
      title: req.body.title,
      author: req.body.author,
      notes: req.body.notes,
      checked: false
    };
    requests.push(newRequest);
    saveDatabase();
    res.redirect('/'); // Redirect back to the home page after adding
  });

  app.post('/mark-available', (req, res) => {
    const { id } = req.body;
    const request = requests.find(r => r.id === id);
    if (request) {
      request.checked = !request.checked; // Toggle the 'checked' status
      saveDatabase();
    }
    res.redirect('/');
  });

  app.post('/delete-request', (req, res) => {
    const { id } = req.body;
    requests = requests.filter(r => r.id !== id);
    saveDatabase();
    res.redirect('/');
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

initializeApp(); // Call the async function to start the server