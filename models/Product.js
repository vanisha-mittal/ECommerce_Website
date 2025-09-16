const mongoose= require("mongoose");
const Review = require("./Review");
const User = require("./User");

const productSchema=new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true
    } ,
    img: {
        type:String,
        trim:true,
        // default 
    },
    price:{
        type:Number,
        min:0,
        required:true,
    },
    desc:{
        type:String,
        trim:true
    },
    avgRating:{
        type:Number,
        default:0
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }
})


productSchema.statics.updateAvgRating = async function (productId) {
    const product = await this.findById(productId).populate("reviews");
    if (product && product.reviews.length > 0) {
        const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
        product.avgRating = total / product.reviews.length;
    } else {
        product.avgRating = 0;
    }
    await product.save();
    return product;
};
productSchema.post("save", async function (doc, next) {
    await doc.constructor.updateAvgRating(doc._id);
    next();
});
productSchema.post("findOneAndDelete", async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})


let Product=mongoose.model('Product', productSchema);

module.exports=Product;