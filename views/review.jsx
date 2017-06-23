var React = require('react');

const Review = (props) => (
  <div>
    <h3>{props.rank}: {props.name}</h3>
    <h5>positivity score: {props.score}</h5>
    <h5>comparative rank: {props.comparative}</h5>
  </div>
)

module.exports = Review;
