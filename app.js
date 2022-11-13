const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');  //tell him filename we are in,
const morgan = require('morgan');
const path = require('path');

const PORT= process.env.PORT || 3000;
const app =express();   //instance

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'/public/')));

app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/', ( req, res)=>{
    res.render('index', {title: 'the POLISS', data:['a','b','c','d','e']});
})

app.listen(PORT, ()=> {
    debug(`Listening for CH Hamza on ${chalk.green(PORT)}`);
})