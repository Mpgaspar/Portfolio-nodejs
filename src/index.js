const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


// Connect server
const app = express();

app.listen(app.get('port') || 3333, () => {
    console.log('Server starded on port', app.get('port'));
}); 


// Settings
app.set('port', process.env.PORT || 3333);
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
app.use(require('./routes/service'));

// Public
app.use(express.static(path.join(__dirname, 'public')));