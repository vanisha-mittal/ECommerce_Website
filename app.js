const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seedDB=require('./seed')
const ejsMate=require('ejs-mate')
const methodOverride=require('method-override');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/User');


if(process.env.NODE_ENV !=='production'){
  require('dotenv').config();
}


const productRoute=require('./routes/product');
const reviewRoute=require('./routes/review');
const authRoute=require('./routes/auth');
const cartRoute=require('./routes/cart');
const productApi = require('./routes/api/productapi');
const paymentRoutes = require('./routes/payment');  



const dbURL=process.env.dbURL || 'mongodb://localhost:27017/shopping-app-2';
mongoose.connect(dbURL)
.then(()=>{console.log("DB connected");
})
.catch(()=>{console.log("DB error")})

let configSession={
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    expires:Date.now()+24*60*60*1000*7  
  }
}


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(session(configSession)); 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.currentUser=req.user
  res.locals.success=req.flash('success');
  res.locals.error=req.flash('error');
  next();
})



//Passport
passport.use(new LocalStrategy(User.authenticate()));



//seeding
// seedDB()
app.get('/', (req, res) => {
  res.render('home');
});

app.use(productRoute);
app.use(reviewRoute);
app.use(authRoute);
app.use(cartRoute);
app.use(productApi);
app.use(paymentRoutes); 



app.listen(8080,()=>{
    console.log(`Server connected at port 8080`);
})