# Horizon Book Request System

A self-hosted web application that allows users to submit book requests, mark them as "available," and delete them. The system provides a simple interface for managing a community book wishlist or self hosted book library acquisition requests.

## Features

*   **Book Request Form:** Users can submit requests with their name, book title, author, and additional notes.
*   **Dynamic Request List:** All submitted book requests are displayed on the main page.
*   **Mark as Available:** A button allows marking a requested book as "AVAILABLE" once it's been acquired.
*   **Delete Functionality:** Users can remove book requests from the list.
*   **Google Books API Search:** Search for books using the Google Books API, view results, and auto-fill the request form.
*   **Dark Mode:** A visually appealing dark theme for comfortable viewing.
*   **Responsive Design:** Optimized for various screen sizes.

## Technologies Used

*   **Node.js:** JavaScript runtime for server-side logic.
*   **Express.js:** Web framework for building the API and handling routes.
*   **EJS (Embedded JavaScript):** Templating engine for dynamic HTML generation.
*   **`fs` and `path` modules:** Node.js built-in modules for file system operations (storing data in `db.json`).
*   **`uuid`:** Library for generating unique IDs for book requests.
*   **`body-parser`:** Middleware for parsing incoming request bodies.
*   **`node-fetch`:** Lightweight module for making HTTP requests (used for Google Books API calls).
*   **Docker:** For containerization and easy deployment.

## Local Installation

To run this project locally without Docker:

1.  **Clone the repository (if applicable):**
    ```bash
    git clone https://github.com/c0deirl/Horizon-Book-Request.git
    cd book-request
    ```
    (If you don't have a Git repository, just navigate to your project directory.)

2.  **Install Node.js:**
    Ensure you have Node.js (version 18 or higher is recommended) and npm installed. You can download it from [nodejs.org](https://nodejs.org/).

3.  **Install dependencies:**
    Navigate to the project root directory in your terminal and install the required Node.js packages:
    ```bash
    npm install
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The application will be accessible at `http://localhost:3000`.

## Development Docker Setup and Deployment

This application can be easily containerized and deployed using Docker. These instructions are for locally building and deploying, to use the pre-made container, ready to go, see below.

### 1. Build the Docker Image

Navigate to the project's root directory in your terminal where the `Dockerfile` and `.dockerignore` files are located.

```bash
docker build -t book-request-app .
```

*   `-t book-request-app`: Tags the image with the name `book-request-app`. You can choose a different name.
*   `.`: Specifies that the build context is the current directory.

### 2. Run the Docker Container

Once the image is built, you can run it:

```bash
docker run -p 3000:3000 book-request-app
```

*   `-p 3000:3000`: Maps port 3000 on your host machine to port 3000 inside the Docker container.
*   `book-request-app`: The name of the image to run.

Your application should now be accessible at `http://localhost:3000`.


## Ready to use Docker

This app is provided on dockerhub for use by anyone. I will update it periodically with new functionality and features.

1.  **Pull the image:**
    ```bash
    docker pull mgreathouse/horizon-book-request:latest
    ```

2.  **Run the container:**
    ```bash
    docker run -d -p 3000:3000 --name book-request mgreathouse/horizon-book-request:latest
    ```

The application will then start and be available at `http://ip:3000`.

---
## Screenshots
<img width="1196" height="833" alt="request1" src="https://github.com/user-attachments/assets/96bd7965-a416-452b-9eb3-c7fbb5f4721a" />
<img width="1071" height="818" alt="request2" src="https://github.com/user-attachments/assets/51862e70-e1e0-4ce5-a9be-0da20711bcb0" />
<img width="1133" height="874" alt="request3" src="https://github.com/user-attachments/assets/5ee3946e-38c7-4862-8f4d-6721debca7a2" />

---

## Changelog

### Version 1.1.0 - Google Books API Integration

*   **Feature:** Integrated Google Books API to allow users to search for books.
    *   New `/search-books` route in `server.js` to handle API queries.
    *   New `views/search.ejs` page to display search results.
    *   Auto-fill functionality for the book request form from search results using `localStorage`.
*   **Dependency:** Added `node-fetch` for making HTTP requests to external APIs.
*   **Documentation:** Updated `README.md` with new features, `node-fetch`, API key setup instructions, and a Changelog section.
*   **Styling:** Added new CSS styles in `public/css/style.css` for search forms and book results display.
*   **Fix:** Resolved persistent syntax errors in `server.js` related to arrow functions and template literals.
*   **Debugging:** Added extensive console logging and improved user-facing error messages for Google Books API calls to aid in troubleshooting.

### Version 1.0.0 - Initial Release

*   **Features:** Basic book request system with form submission, dynamic list display, mark as available, and delete functionality.
*   **Styling:** Implemented dark mode and responsive design.
*   **Containerization:** Included `Dockerfile` and `.dockerignore` for Docker deployment.
*   **Documentation:** Initial `README.md` covering local installation and Docker setup.

