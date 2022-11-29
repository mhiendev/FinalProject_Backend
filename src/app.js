const express = require('express');
const cors = require('cors');
const stationeryController = require('./controllers/stationery.controller');
const ApiError = require('./api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application.' });
});

app.route('/api/products')
    .get(stationeryController.findAllProd)
    .post(stationeryController.createPrd)

app.route('/api/products/:id')
    .get(stationeryController.getPrd)
    .put(stationeryController.updatePrd)

app.route('/api/customers/vip')
    .get(stationeryController.findAllVIP);

app.route('/api/orders')
    .get(stationeryController.findAllOrd)

app.route('/api/orders/:id')
    .delete(stationeryController.deleteOrd)

module.exports = app;

//Handle 404 response
app.use((req, res, next) => {
    //Handler for unknown route.
    //Call next() to pass to the error handling middleware.
    return next(new ApiError(404, 'Resource not found'));
});

//Define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //The centralized error handling middleware.
    //In any route handler, calling next(error)
    //   will pass to this error handling middleware.
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});