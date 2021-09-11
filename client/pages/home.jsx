import React from 'react';
import ActivityForm from '../components/activityform';
import Title from '../components/title';
import PlanForm from '../components/planform';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'plan-form',
      planId: null,
      plans: []

    };
    this.setFormView = this.setFormView.bind(this);
    this.setPlanId = this.setPlanId.bind(this);
  }

  componentDidMount() {
    fetch('/api/plans')
      .then(response => response.json())
      .then(data => {
        this.setState({ plans: data });
      });
  }

  setFormView() {
    this.setState({ view: 'activity-form' });
  }

  setPlanId(planId) {
    this.setState({ planId: planId });
  }

  render() {
    return (
    <>
      <div className="container">
        <div className="col-2 col-xs-2 col-md-4 col-lg-6 position-absolute start-0">
        <i className="fas fa-bars"></i>
      </div>
    <Title />
    { this.state.view === 'activity-form' ? <ActivityForm planId={this.state.planId}/> : <PlanForm setPlanId={this.setPlanId} setFormView={this.setFormView}/>}
      </div>
    </>
    );
  }
}
