import express from 'express';

// Setup the app
const app = express();
app.use(express.json());

// Serve files in the app's built public directory
app.use(express.static('./vue-app/dist'));

// Start the express server to listen for HTTP requests
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// API stuff can go here.

// Catch all route - place this last.
// app.get('*', (req, res) => {
//     res.sendFile('index.html', { root: '../vue-app/dist' });
// });