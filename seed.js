const mongoose=require('mongoose');
const Product=require('./models/Product');

const products=[
    {
        name:"Iphone 18pro",
        img:"https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lfGVufDB8fDB8fHww" ,
        price: 200000,
        desc: " very costly"
    },{
        name:"Macbook m2 pro",
        img:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D" ,
        price: 250000,
        desc: "very very costly"

    },{
        name:"Iwatch",
        img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHx8MHx8fDA%3D" ,
        price: 50000,
        desc: "sasta"
    }
]


async function seedDB(){
    await Product.insertMany(products);
    console.log("data seede successfully");
}

module.exports=seedDB;