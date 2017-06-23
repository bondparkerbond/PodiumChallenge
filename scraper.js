var Xray = require('x-ray');
var xray = new Xray();

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
