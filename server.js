/*
- Middleware: Functions that have the access to req-res object and next function in app's req-res cycle.
- They can make changes to req-res objects, end req-res cycle, and call the next middleware function in the stack.
- Middleware can be used for authentication, logging, and error hadnling.
- They process the requests before they reach the route handlers.
- Can be executed multiple times, middlewware functions can be chained using next() function.
- Placed before route handler
*/

/*
- Route handlers: Functions that handle requests to specific endpoints (path) and define the resonse.
- Handle https methods(GET, POST, PUT)
- They define what should happen when the request hits a particular route.
- Typically executed once per route, responding to a specific request.
- Placed after route handler
*/

/* 
In the context of event handling, middleware, or any situation where you want a function to be called at a specific time (by the browser, Express, or other parts of your code), you generally pass the function reference without invoking it (without using `()`), allowing the environment to handle the invocation when the event occurs.
 */

/* 
Use app.use() for global middleware that should be executed for all requests, regardless of http method or route 
Use app.get() for handling HTTP GET requests on specific routes.
Use app.all() when you want to handle all HTTP methods for a specific route, apply the same logic for any type of http request (GET, POST...)
*/


const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors'); 
const {logger}  = require('./middleware/log_events');
const errorHandler = require('./middleware/error_handler');
const { error } = require('console');
const router = require('./routes/subdir');

const PORT = process.env.PORT || 3500;



const whiteList = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
// Here I define webite domains that can make a request and access to the backend node server. 
const cors_options = {
    origin: (origin, callback) => {
       // if the domain is in the whiteList, !origin = undefined or null, when we make a request from localhost:3500 it outputs the req.headers.origin as undefined, in order to solve this issue we add || !origin 
        if(whiteList.indexOf(origin) != -1 || !origin){
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by the cors'))
        }
    },
    optionSuccessStatus: 200,
    }

// custom middleware logger
app.use(logger);

app.use(cors(cors_options));

// built-in middleware to handle urlencoded data (form data)
// ‘content-type: application/x-www-form-urlencoded’
// extended: false: Suitable for simple form submissions where data is flat and does not require nested structures.
// extended: true: Better for complex forms or APIs where the data structure might be nested or hierarchical.
app.use(express.urlencoded({ extended: false }));

// parse json payloads and make them available in req.body
app.use(express.json());

// Serve static files like css, images, texts
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/subdir', express.static(path.join(__dirname, 'public')));


app.use('/subdir', router); // define a router using router
//or
//app.use('/subdir', require('./routes/subdir')) 
app.use('/', require('./routes/root'));

app.use('/employee', require('./routes/api/employee'));

// Catch-all route handler for any unmatched routes
app.all('*', (req, res) => {
    // Set the status to 404 (Not Found)
    res.status(404);

    // Check if the client accepts HTML
    if (req.accepts('html')) {
        // Send a custom 404 HTML page
        res.sendFile(path.join(__dirname, 'html_files', '404.html'));
    }
    // Check if the client accepts JSON
    else if (req.accepts('json')) {
        // Send a JSON response with an error message
        res.json({ error: "Not found" });
    }
    // If the client accepts neither HTML nor JSON
    else {
        // Send a plain text response
        res.type('txt').send("404 Not found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


