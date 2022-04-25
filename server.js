const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

const options = {
		key: fs.readFileSync(path.join(__dirname, '/key.pem'), 'utf-8'),
	    cert: fs.readFileSync(path.join(__dirname, '/cert.pem'), 'utf-8'),
	};
const mimeTypes = {
		"html": "text/html",
	    "jpeg": "image/jpeg",
	    "jpg": "image/jpeg",
	    "png": "image/png",
	    "svg": "image/svg+xml",
	    "json": "application/json",
	    "js": "text/javascript",
	    "css": "text/css"
}

const app = express();
// Default route for server status
app.get('/', (req, res) => {
	res.json({ message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` });
});

app.post('/', (req, res) => {
	res.json({ message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` });
});


// Create an HTTP server.
let serverHttp = http.createServer(app).listen(HTTP_PORT, "127.0.0.1", () => {
	let addr = serverHttp.address();
	console.log(`Server Http listening at ${addr.address} : ${addr.port}`);
});

// Create an HTTPS server.
let serverHttps = https.createServer(options, app).listen(HTTPS_PORT, "127.0.0.1", () => {
	let addr = serverHttps.address();
	console.log(`Server Https listening at ${addr.address} : ${addr.port}`);
});