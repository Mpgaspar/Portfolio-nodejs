const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

// Connect server
const app = express();

app.listen(process.env.PORT, () => {
    console.log('Server started on port', process.env.PORT);
}); 

// Settings
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
app.use('/', require('./routes/index'))
app.use(require('./routes/authentication'));
app.use('/about', require('./routes/about'));
app.use('/skills', require('./routes/skills'));
app.use('/links', require('./routes/links'));
app.use('/experience', require('./routes/experience'));
app.use('/contact', require('./routes/service'));


// Public
app.use(express.static(path.join(__dirname, 'public')));