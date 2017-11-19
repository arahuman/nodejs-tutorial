const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const fs = require('fs');

hbs.registerPartials(__dirname  + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

var app = express();
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} - ${req.url}`
  fs.appendFile('server.log',log+"\n");
  console.log(log)
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

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle:'Projects Page'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
