const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');

const app = express()
const port = 20180

app.set('view engine','ejs')
app.use(express.static('CSS'))
app.use(express.urlencoded({extended:false}));
app.set('views',path.join(__dirname,'views'));
app.use(cookieSession({
    name : 'namecookie',
    keys : ['order1','order2'],
    maxAge: 3600*2000
}))

const locate = mysql.createPool({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'root', // MYSQL USERNAME
    password : '', // MYSQL PASSWORD
    database : 'login_system' // MYSQL DB NAME
}).promise();

const ifNotLoggedin = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.render('login_en');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/');
    }
    next();
}

app.get('/',ifNotLoggedin,(req,res,next) => {
    locate.execute("SELECT `name` FROM `users` WHERE `id` = ?",[req.session.userID])
    .then(([rows]) => {
        res.render('/',{
            name:rows[0].name
        })
    })
})


app.post('/register_en', ifLoggedin, 
// post data validation(using express-validator)
[
    body('id_email','Invalid email address!').isEmail().custom((value) => {
        return locate.execute('SELECT `email` FROM `users` WHERE `email`=?', [value])
        .then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('This E-mail already in use!');
            }
            return true;
        });
    }),
    body('id_name','Username is Empty!').trim().not().isEmpty(),
    body('id_pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
],// end of post data validation
(req,res,next) => {

    const validation_result = validationResult(req);
    const {id_name, id_pass, id_email} = req.body;
    // IF validation_result HAS NO ERROR
    if(validation_result.isEmpty()){
        // password encryption (using bcryptjs)
        bcrypt.hash(id_pass, 12).then((hash_pass) => {
            // INSERTING USER INTO DATABASE
            locate.execute("INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",[id_name,id_email, id_pass])
            .then(result => {
                res.render('login_en');
            }).catch(err => {
                // THROW INSERTING USER ERROR'S
                if (err) throw err;
            });
        })
        .catch(err => {
            // THROW HASING ERROR'S
            if (err) throw err;
        })
    }
    else{
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH VALIDATION ERRORS
        res.render('register_en',{
            register_error:allErrors,
            old_data:req.body
        });
    }
});

// app.get("/",(req,res)=>{
//     res.render('home_en')
// })

app.get("/advice_en",(req,res)=>{
    res.render('advice_en')
})

app.get("/news_en",(req,res)=>{
    res.render('news_en')
})

app.get("/story_en",(req,res)=>{
    res.render('story_en')
})

app.get("/support_en",(req,res)=>{
    res.render('support_en')
})

app.get("/register_en",(req,res)=>{
    res.render('register_en')
})

app.get("/login_en",(req,res)=>{
    res.render('login_en')
})

app.get("/tos_en",(req,res)=>{
    res.render('tos_en')
})

app.get("/ogn_en",(req,res)=>{
    res.render('ogn_en')
})

app.get("/home_th",(req,res)=>{
    res.render('home_th')
})

app.get("/advice_th",(req,res)=>{
    res.render('advice_th')
})

app.get("/news_th",(req,res)=>{
    res.render('news_th')
})

app.get("/story_th",(req,res)=>{
    res.render('story_th')
})

app.get("/support_th",(req,res)=>{
    res.render('support_th')
})

app.get("/register_th",(req,res)=>{
    res.render('register_th')
})

app.get("/login_th",(req,res)=>{
    res.render('login_th')
})

app.get("/tos_th",(req,res)=>{
    res.render('tos_th')
})

app.get("/ogn_th",(req,res)=>{
    res.render('ogn_th')
})

app.listen(port,()=>{
    console.log("Server is on port: ",port)
})





app.post('/', ifLoggedin, [
    body('email').custom((value) => {
        return locate.execute('SELECT email FROM users WHERE email=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;

            }
            return Promise.reject('Invalid Email Address!');

        });
    }),
    body('pass','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {pass, email} = req.body;
    if(validation_result.isEmpty()){

        locate.execute("SELECT * FROM users WHERE email=?",[email])
        .then(([rows]) => {
            bcrypt.compare(pass, rows[0].password).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].id;

                    res.redirect('/');
                }
                else{
                    res.render('Login',{
                        login_errors:['Invalid Password!']
                    });
                }
            })
            .catch(err => {
                if (err) throw err;
            });


        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
        res.render('login_en',{
            login_errors:allErrors
        });
    }
});
// END OF LOGIN PAGE

// LOGOUT
app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});
// END OF LOGOUT

app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});










