const Product = require('./models/Product');
const {productSchema, reviewSchema}=require('./Schema');

const validateProduct=(req,res,next)=>{
    let {name,img,price,desc}=req.body;
    const {error}=productSchema.validate({name,img,price,desc});
    if(error){
        return res.render('error');
    }
    next();
}

const validateReview=(req,res,next)=>{
    let {rating, comment}=req.body;
    const {error}=reviewSchema.validate({rating, comment});
    if(error){
        return res.render('error');
    }
    next();
    
}
const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Please Login first!!");
        return res.redirect('/login');
    }
    next();
}

const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash("error","You do not have permission to do that");
        return res.redirect("/products");
    }
    else if(req.user.role!='seller'){
        req.flash("error","You do not have permission to do that");
        return res.redirect("/products");
    }
    next();
}
const isProductAuthor = async(req,res,next)=>{
    let {id} = req.params;
    const product = await Product.findById(id);
    console.log(product.author);
    console.log(req.user);
    if(!product.author.equals(req.user._id)){
        req.flash('error' , 'you donot have the permission to do that');
        return res.redirect(`/product/${id}`);
    }
    next();
}
module.exports={validateProduct,validateReview,isLoggedIn,isSeller,isProductAuthor};