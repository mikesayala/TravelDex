import React from 'react';
import Accordion from '../components/accordion';
import AppDrawer from '../components/app-drawer';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'results',
      currentPlanId: parseInt(window.location.hash.substring(15)),
      currentPlan: {}
    };
  }

  componentDidMount() {
    fetch('/api/plans').then(response => response.json())
      .then(planData => {
        const currentPlan = planData.find(plan => this.state.currentPlanId === plan.planId);
        this.setState({ currentPlan });
      });
  }

  render() {
    return (
      <>
        {/* <AppDrawer />
        <div className="container">
           <div className="col-12 col-md-5 ms-3">
          <img src={this.state.currentPlan.pictureUrl} className="img-fluid h-25 w-3 float-left d-inline-block" alt=""/>
        </div>
        <div className="d-flex align-items-end flex-column flex-xxl-column-reverse">
          <h2 className="m-3 row-1 plan d-flex justify-content-end me-3">
            {this.state.currentPlan.date}
          </h2>
        </div>
        <div className="d-flex flex-row">
          <h1 className="m-3 plan" style={{ color: 'palevioletred' }}>
            {this.state.currentPlan.planName}
          </h1>
          <a href={`#activityForm?planId=${this.state.currentPlanId}`}>
            <button>click me</button>
          </a>
        </div>
        <Accordion plan={this.state.currentPlanId} />
        </div> */}
        <AppDrawer />
        <div className="container height-80">
           <div className="d-flex row">
             <div className="col-12 col-sm-6 p-0 d-flex justify-content-center">
               <img src={this.state.currentPlan.pictureUrl} className="img-fluid pictureUrl h-75 w-3 p-0 m-0" alt=""/>
             </div>
             <div className="col-12 col-sm-6">
                <h2 className="m-3 plan me-3">
                  {this.state.currentPlan.date}
                </h2>
                <h1 className="m-3 plan" style={{ color: 'palevioletred' }}>
                  {this.state.currentPlan.planName}
                </h1>
                <a href={`#activityForm?planId=${this.state.currentPlanId}`}>
                  <button>click me</button>
                </a>
                <Accordion plan={this.state.currentPlanId} />
             </div>
        </div>
        </div>
      </>
    );
  }
}
