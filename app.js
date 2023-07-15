require('dotenv').config();


const express = require('express');
const hbs = require('express-handlebars');
const app = express();

const port = 3000;

app.use(express.static('public'));

// Views , Controllers, Models
app.engine('hbs', hbs.engine({extname: 'hbs', defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')





app.use('/', require('./server/Routes/main'));


app.listen(port, () => { console.log(`Server running at http://localhost:${port}`)});
