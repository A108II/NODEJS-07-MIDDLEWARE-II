# Project Title

This project is a simple Node.js application using Express.js framework. It demonstrates the use of middleware, routing, CORS, and error handling.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Middleware](#middleware)
- [Routing](#routing)
- [CORS Configuration](#cors-configuration)
- [Error Handling](#error-handling)
- [Usage Instructions](#usage-instructions)
- [Directory Structure](#directory-structure)

## Project Overview

This project serves as a basic example of how to set up a Node.js server using Express.js. It includes examples of using middleware for logging, error handling, parsing JSON, and URL-encoded data. It also demonstrates serving static files and handling CORS (Cross-Origin Resource Sharing).

## Features

- Middleware for logging requests
- Custom error handling middleware
- CORS configuration for specific whitelisted domains
- Serving static files
- JSON and URL-encoded payload parsing
- Modular route handling
- Catch-all route for handling 404 errors

## Middleware

### Custom Middleware Logger

A custom middleware logger is used to log requests. Middleware functions have access to the `req`, `res`, and `next` objects. They can make changes to the request and response objects, end the request-response cycle, or pass control to the next middleware function in the stack.

### Built-in Middleware

- **express.urlencoded**: Parses URL-encoded data (form submissions).
- **express.json**: Parses JSON payloads and makes them available in `req.body`.
- **express.static**: Serves static files like CSS, images, and text files.

## Routing

Routes are defined using Express Router. Each route handles specific HTTP methods (GET, POST, PUT, DELETE) and defines the response for each endpoint.

### Main Routes

- `/`: Serves the main application.
- `/subdir`: Serves content from the `subdir` directory.
- `/employee`: Handles API requests related to employees.

### Catch-all Route

A catch-all route handles any unmatched routes, returning a 404 status with appropriate content based on the client's request (HTML, JSON, or plain text).

## CORS Configuration

CORS is configured to allow requests only from specific whitelisted domains. The configuration checks the origin of the request against the whitelist and allows or blocks the request accordingly.

### Whitelisted Domains

- `https://www.google.com`
- `http://127.0.0.1:5500`
- `http://localhost:3500`

## Error Handling

A custom error handler is used to catch and respond to errors. The middleware processes errors and sends appropriate responses to the client.

## Usage Instructions

1. **Install Dependencies**: Ensure you have Node.js installed. Run `npm install` to install the required dependencies.

2. **Start the Server**: Run `npm start` or `node server.js` to start the server. By default, the server will run on port 3500.

3. **Access the Application**: Open your browser and navigate to `http://localhost:3500` to access the application.

## Directory Structure

- **/public**: Contains static files like CSS, images, and text files.
- **/html_files**: Contains HTML files served by the application.
- **/routes**: Contains route handlers for different parts of the application.
  - `root.js`: Handles root-level routes.
  - `subdir.js`: Handles routes under the `/subdir` path.
  - `api/employee.js`: Handles API routes related to employees.
- **/middleware**: Contains custom middleware functions.
  - `log_events.js`: Custom logger middleware.
  - `error_handler.js`: Custom error handling middleware.

## Conclusion

This project serves as a foundation for building more complex Node.js applications using Express.js. It covers essential concepts like middleware, routing, CORS, and error handling, providing a solid starting point for further development.