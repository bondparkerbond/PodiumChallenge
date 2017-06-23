var express = require('express');
var ReactEngine = require('react-engine');

var app = express();

var Xray = require('x-ray');
var xray = new Xray();

var sentiment = require('sentiment');

xray('http://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/?filter=ONLY_POSITIVE#link', '.review-entry',
  [{
    name: '.italic.font-18.black',
    body: '.review-content',
    css: '.rating-50 @class',
  }]
)
  .paginate('a[rel="next"]:last-child@href')
  .limit(5)
  .write('results.json');

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



