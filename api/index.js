const serverless = require('serverless-http');
const express = require('express');
const app = express();

// Import your main app logic from app.js
require('../app')(app);  // app.js will export a function that sets everything up

module.exports.handler = serverless(app);
