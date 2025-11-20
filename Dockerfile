# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# This step is done separately to leverage Docker's layer caching.
# If only package.json changes, dependencies don't need to be reinstalled.
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your Express app is listening on
# Based on your server.js, this is 3000
EXPOSE 3000

# Define the command to run your app
CMD [ "npm", "start" ]