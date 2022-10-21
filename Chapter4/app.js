require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const controllers = require('./controllers');
const router = require('./routes');
const app = express();

const {
    HTTP_PORT = 3000
} = process.env;

app.use(express.json());
app.use(morgan('dev'));
app.use(router);
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    res.render('home');
})

// 404 handler
app.use(controllers.notFound);

//500 handler
app.use(controllers.exception);

app.listen(HTTP_PORT,()=>{
    console.log('listening on port', HTTP_PORT)
});