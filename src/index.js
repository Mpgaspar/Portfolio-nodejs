const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


// Connect server
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlerbars') 
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Global Variables
app.use((req, res, next) => {

    next();
})

// Routes 
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server starded on port', app.get('port'));
}); 

/* Create connection with DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '123456',
    database: 'users' 
});

// Connect DB
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected');
});

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE users';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    });
});*/





