var React = require('react');

const Page = (props) => (
  <html>
    <head>
      <title>{props.title}</title>
    </head>
    <body>
      {props.children}
    </body>
  </html>
);

module.exports = Page;
