// controllers/product.js
const Product = require('../models/Product');
const Review = require('../models/Review');

module.exports.index = async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('products/index.ejs', { products });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

module.exports.renderNewForm = (req, res) => {
    try {
        res.render('products/new');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

module.exports.showProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', { foundProduct, success: req.flash('success') });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

module.exports.createProduct = async (req, res) => {
    try {
        let { name, img, price, desc } = req.body;
        let newProduct = await Product.create({
            name,
            img,
            price,
            desc,
            author: req.user ? req.user._id : null
        });
        req.flash('success', 'Product added successfully!!');
        return res.redirect(`/product/${newProduct._id}`);
    } catch (e) {
        return res.status(500).render('error', { err: e.message });
    }
};


module.exports.renderEditForm = async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc });
        req.flash('success', 'Product edited successfully!!');
        res.redirect(`/product/${id}`);
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully!!');
        res.redirect('/products');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
};
