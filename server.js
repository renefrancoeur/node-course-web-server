const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //for heroku
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server. log.');
    }
  });
  next();
});
//maintenance mode stops everything from happening because there is no next function
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
  pageTitle: 'Home page',
  welcomemessage: 'Welcome to this page'
  });
});


app.get('/about',  (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


app.get('/newpage', (req, res) => {
  res.render('', {
    pageTitle: 'new page'
  });
});

app.get('/bad', (req, res) =>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
