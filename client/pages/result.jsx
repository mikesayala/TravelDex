import React from 'react';
import Accordion from '../components/accordion';
import AppDrawer from '../components/app-drawer';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'results',
      currentPlanId: parseInt(this.props.planId),
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
        <AppDrawer />
        <div className="container">
           <div className="d-flex  row">
             <div className="col-12 col-sm-6 p-0 d-flex h-25 justify-content-center">
               <img src={this.state.currentPlan.pictureUrl} className=" pictureUrl h-25 p-0 m-0" alt=""/>
             </div>
             <div className="col-12 h-100 col-sm-6">
                <h2 className="m-1 plan me-3">
                  {this.state.currentPlan.date}
                </h2>
                <h1 className="m-1 plan">
                  {this.state.currentPlan.planName}
                </h1>
                <a href={`#activityForm?planId=${this.state.currentPlanId}`} className="d-flex justify-content-end margin-3">
                  <button className="mb-2 btn btn-primary">Add</button>
                </a>
                <Accordion plan={this.state.currentPlanId} />
             </div>
        </div>
        </div>
      </>
    );
  }
}
