const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname  + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  var now = new Date().toString();
  console.log(`${now}: ${req.method} - ${req.url}`)
  next();
});

//app.use((req,res,next)=>{
//  res.render('maint.hbs');
//});

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle:'Home Page',
    login : 'Andrew'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
