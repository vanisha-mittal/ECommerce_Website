const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview ,isLoggedIn} = require('../middleware');

router.post('/product/:id/review',isLoggedIn, validateReview, async (req, res) => {
    try {
        let { rating, comment } = req.body;
        let { id } = req.params;
        const product = await Product.findById(id);
        const review = new Review({ rating, comment });
        product.reviews.push(review);
        review.save();
        product.save();
        req.flash('success','Review added successfully!!');
        res.redirect(`/product/${id}`);
    } catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})


module.exports = router;