require('dotenv').config();


const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const port = 3000;

const connectDB = require('./server/config/db-connection');
connectDB();


app.use(express.static('public'));

// Views , Controllers, Models
app.engine('hbs', hbs.engine({extname: 'hbs', defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('partials', __dirname + '/views/partials');



app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./views/routes/main'));


app.listen(port, () => { console.log(`Server running at http://localhost:${port}`)});
