const express = require("express") ;
const app = express() ;


app.use(express.json()) ;
app.use(express.urlencoded()) ;  
const cors = require("cors") ;
app.use(cors()) ;  

const cookieParser = require("cookie-parser") ; 
const session = require("express-session"); 
app.use(cookieParser()) ;
app.use(session({
    secret:'this is my secret',
    cookie:{
        maxAge: 30 * 60 * 1000,
    },                                                                                                                                                                  
    resave:true,
    saveUninitialized:false,
})) ;


app.set('view engine' , 'hbs') ;
app.set('views' , './views') ;



const {showAllStudents , showStudentByRoll , addStudent , updateStudent , deleteByRoll, login , signup} = require("./controllers/control") ;


function isLoggedIn(req,res,next){
    
    if(req.session.loggedIn){
        next() ;
    }
    else{
        res.redirect('/') ;
    }
}


// login 
app.get('/' , (req,res)=> res.render('loginPage')) ;
app.post('/login' , login) ;

// signup
app.get('/signup' , (req,res)=> res.render('signupPage')) ;
app.post('/signup' , signup);


app.post("/addStudent" , addStudent) ;

app.put("/update/:rollno", updateStudent) ;

app.delete("/delete/:rollno" , deleteByRoll);

app.get('/students' , showAllStudents) ;

app.get('/students/:rollno' , showStudentByRoll) ;



app.get("/index" , isLoggedIn , (req,res)=>{
    let user = req.session.loggedInUser ;
    res.render('index' , {user}) ;
});


app.get('/addStudentPage' , (req,res)=> res.render('addStudentPage')) ;
app.get('/deleteStudentPage' , (req,res)=> res.render('deleteStudentPage')) ;
app.get('/updateStudentPage' , (req,res)=> res.render('updateStudentPage')) ;



require("./database/database").connect() ;
require("dotenv").config() ;  

app.listen(process.env.PORT , ()=>{
    console.log(`server listening at http://localhost:3000 `) ;
});

