const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Port to Heroku.
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.set('view engine', 'hbs');



app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} --- ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log(err);
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
//   //next();
// });



app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome to my website.',
    currentYear : new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
res.render('about.hbs', {
  pageTitle : 'About Page',
  currentYear : new Date().getFullYear()
});
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage : 'Unable to handled request'
  });
});
app.listen(port, () => {
  console.log(`Server is up in port ${port}.`);
});
