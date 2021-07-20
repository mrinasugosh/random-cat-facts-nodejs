
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {fact: null, error: null});
})

app.post('/', function (req, res) {
  let url = `https://catfact.ninja/fact`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {fact: null, error: 'Error, please try again'});
    } else {
      let resp = JSON.parse(body)
      if(resp.fact == undefined){
        res.render('index', {fact: null, error: 'Error, please try again'});
      } else {
        let randomFact = resp.fact;
        res.render('index', {fact: randomFact, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})