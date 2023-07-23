//For access to .env file

require('dotenv').config();



//Import dependencies

const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const session = require('express-session');
const bodyParser = require('body-parser');


// Connect the database

const connectDB = require('./server/config/db-connection');
connectDB();



// Views , Controllers, Models, routes

app.engine('hbs', hbs.engine({extname: 'hbs', defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('partials', __dirname + '/views/partials');
app.use(express.static('public'));

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));



//Handle cookies/sessions

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    mongoStore: mongoStore.create({mongoUrl: process.env.MONGODB_URI}),
    cookie:{maxAge: new Date(Date.now() + (3600000))},
    
}));


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(port, () => { console.log(`Server running at http://localhost:${port}`)});
