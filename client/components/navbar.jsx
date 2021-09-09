import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <i className="fas fa-bars"></i>
          </div>
          <div className="col-10">
              <img className="travelDex" src="images/traveldex.png" alt="logo"/>
          </div>
        </div>
        <div className="row align-center justify-center">
          <div className="col-6 flex-col-rev height-10">
            <img className="plan" src="images/plan.png" alt="plan"/>
          </div>
        </div>
      </div>
    );
  }
}
