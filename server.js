'use strict';

require('node-jsx').install();

var express = require('express');
var renderer = require('react-engine');
var app = express();
var engine = renderer.server.create();

var sentiment = require('sentiment'); // runs sentiment analysis on reviews
var json = require('./results.json'); // created by running scraper.js script

var string = JSON.stringify(json);
var parsed = JSON.parse(string);

function filterScores(object) {
  if (!!object.css) {
    return object;
  }
}
// filter out reviews that didn't get a perfect 50 score
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
// run sentimet analysis on remaining results
var sentimental = filtered.map(sentimentize);
// sort results primarily on sentiment score and secondarily on comparative score
var sortedSentiment = sentimental.sort(function(a, b) {
  return parseFloat(b.score) - parseFloat(a.score) || parseFloat(b.comparative) - parseFloat(a.comparative);
});
// Log top 3 results to the console
console.log('Top three most positive comments are: ');
console.log({ 1.: sentimental[0] });
console.log({ 2.: sentimental[1] });
console.log({ 3.: sentimental[2] });
// return top 10 results for react to use in case I ever decide to not just hard code top 3.
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

app.listen(3000);
console.log('Now serving on localhost:3000');
