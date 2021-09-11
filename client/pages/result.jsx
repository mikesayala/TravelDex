import React from 'react';
import Accordion from '../components/accordion';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'results'
    };
  }

  render() {
    return (
      <>
      <div>
        <img src="images/dlr.png" className="img-fluid " alt=""/>
      </div>
      <Accordion />
      </>
    );
  }
}
