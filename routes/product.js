const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateProduct,isLoggedIn,isSeller, isProductAuthor}=require('../middleware');

router.get('/products', async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('products/index.ejs', { products });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

router.get('/product/new',isLoggedIn,isSeller, (req, res) => {
    try {
        res.render('products/new');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


router.get('/product/:id',isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews'); //array 
        res.render('products/show', { foundProduct , success:req.flash('success')});
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})
router.post('/products',isLoggedIn,isSeller, validateProduct, async (req, res) => {
    try {
        let { name, img, price, desc } = req.body;
        await Product.create({ name, img, price, desc, author:req.user });
        req.flash('success','Product added successfully!!');
        res.redirect('/products');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


router.get('/product/:id/edit',isLoggedIn, isProductAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct });
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})
router.patch('/product/:id',isLoggedIn,isProductAuthor,validateProduct, async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc });
        req.flash('success','Product edited successfully!!');
        res.redirect(`/product/${id}`);
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})
router.delete('/product/:id',isLoggedIn,isProductAuthor, async (req, res) => {
    try {
        let { id } = req.params;
        const product = Product.findById(id);
        // for(let i of product.reviews){
        //     await Review.findByIdAndDelete(i);
        // }
        await Product.findByIdAndDelete(id);
        req.flash('success','Product deleted successfully!!');

        res.redirect('/products');
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})



module.exports = router;