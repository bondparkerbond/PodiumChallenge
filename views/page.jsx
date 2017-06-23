import React from 'react';

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

export default Page;
