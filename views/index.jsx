import React from 'react';
import Page from './page';

const Index = (props) => (
  <Page {...props}>
    <h1>{props.title}</h1>
  </Page>
)

export default Index;
