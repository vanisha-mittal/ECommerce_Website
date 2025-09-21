
const express = require('express');
const router = express.Router();
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware');
const productController = require('../controllers/product');

// Index route
router.get('/products', productController.index);

// New form
router.get('/product/new', isLoggedIn, isSeller, productController.renderNewForm);

// Show product
router.get('/product/:id', isLoggedIn, productController.showProduct);

// Create product

router.post('/products', isLoggedIn, isSeller, validateProduct, productController.createProduct);

// Edit form
router.get('/product/:id/edit', isLoggedIn, isProductAuthor, productController.renderEditForm);

// Update
router.patch('/product/:id', isLoggedIn, isProductAuthor, validateProduct, productController.updateProduct);

// Delete
router.delete('/product/:id', isLoggedIn, isProductAuthor, productController.deleteProduct);

module.exports = router;
