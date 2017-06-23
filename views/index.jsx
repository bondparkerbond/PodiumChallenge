var React = require('react');
var Page = require('./page.jsx');
var Review = require('./review.jsx');

const Index = (props) => (
  <Page {...props}>
    <h1>{props.title}</h1>
    { props.reviews && props.reviews.topTen[2] ?
      <div>
        <Review
          key={1}
          rank={1}
          name={props.reviews.topTen[0].name}
          score={props.reviews.topTen[0].score}
          comparative={props.reviews.topTen[0].comparative}
        />
        <Review
          key={2}
          rank={2}
          name={props.reviews.topTen[1].name}
          score={props.reviews.topTen[1].score}
          comparative={props.reviews.topTen[1].comparative}
        />
        <Review
          key={3}
          rank={3}
          name={props.reviews.topTen[2].name}
          score={props.reviews.topTen[2].score}
          comparative={props.reviews.topTen[2].comparative}
        />
      </div>
      :
      <h2> No results to display, please run the scraping script! </h2>
    }
  </Page>
)

module.exports = Index;
