var React = require('react');
var Page = require('./page.jsx');

const Index = (props) => (
  <Page {...props}>
    <h1>{props.title}</h1>
  </Page>
)

module.exports = Index;
