import React from 'react';

export default class Title extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-5 col-sm-5 col-md-7 col-lg-5 col-xl-4">
              <img className="w-100 mt-3" src="images/traveldex.png" alt="logo"/>
          </div>
        </div>
        <div className="row align-center d-flex justify-content-center">
          <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-4 d-flex flex-column-reverse height-10">
            <img className="plan d-flex justify-content-center" src="images/plan.png" alt="plan"/>
          </div>
        </div>
      </div>
    );
  }
}
