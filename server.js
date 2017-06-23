'use strict';

require('node-jsx').install();

var express = require('express');
var renderer = require('react-engine');
var app = express();
var engine = renderer.server.create();

var sentiment = require('sentiment');
var json = require('./results.json');

var string = JSON.stringify(json);
var parsed = JSON.parse(string);
console.log({ TotalReviewsScraped: parsed.length });

function filterScores(object) {
  if (!!object.css) {
    return object;
  }
}
var filtered = parsed.filter(filterScores)

function sentimentize(object) {
  var sentimentInfo = sentiment(object.body);
  var toReturn = {
    score: sentimentInfo.score,
    comparative: sentimentInfo.comparative,
    name: object.name,
  }
  return toReturn;
}
console.log({ withPerfectScores: filtered.length });

var sentimental = filtered.map(sentimentize);

var sortedSentiment = sentimental.sort(function(a, b) {
  return parseFloat(b.score) - parseFloat(a.score) || parseFloat(b.comparative) - parseFloat(a.comparative);
});

console.log('Top three most positive comments are: ');
console.log({ 1.: sentimental[0] });
console.log({ 2.: sentimental[1] });
console.log({ 3.: sentimental[2] });

var topTen = sortedSentiment.slice(0,10);

app.engine('.jsx', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.set('view', renderer.expressView);

var index = function(req, res){
  res.render('index', {
    title: 'Top 3 reveiws',
    reviews: {topTen}
  });
}

app.get('', index);

app.listen(4000);
console.log('Now serving on localhost:4000');
