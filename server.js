var express = require('express');
var ReactEngine = require('react-engine');

var app = express();

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



