require('dotenv').config();

// setup our route
const express = require('express');
const app = express();

// error && not found handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('<h1>Store API </h1> <a href="/api/v1/products">Products Route</a>')
})

// products route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        //Connect DB

        app.listen(port, console.log(`Hi, welcome in port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();