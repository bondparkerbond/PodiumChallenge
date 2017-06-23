var Xray = require('x-ray'); // scraping library
var xray = new Xray();

xray('http://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/?filter=ONLY_POSITIVE#link', '.review-entry',
  [{
    name: '.italic.font-18.black', //reviewer name
    body: '.review-content', // review text
    css: '.rating-50 @class', // used to know if this is a perfect 5 star review or not
  }]
)
  .paginate('a[rel="next"]:last-child@href')
  .limit(5)
  .write('results.json'); // not using a DB because I didn't want the extra overhead
