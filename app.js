const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./db/dbConnect');
const { readdirSync } = require('fs');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));

// Load routes dynamically
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)));

const server = () => {
    dbConnection();
    app.listen(PORT, () => {
        console.log(`Server is listening to ${PORT}`);
    });
};

server();
