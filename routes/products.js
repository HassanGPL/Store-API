const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.route('/').get(productsController.getAllProducts);
router.route('/static').get(productsController.getAllProductsStatic);

module.exports = router;