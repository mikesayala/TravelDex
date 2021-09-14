import React from 'react';
import ActivityForm from '../components/activityform';
import Title from '../components/title';
import PlanForm from '../components/planform';
import AppDrawer from '../components/app-drawer';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'plan-form',
      planId: null
    };
    this.setFormView = this.setFormView.bind(this);
    this.setPlanId = this.setPlanId.bind(this);
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
        <AppDrawer plans={this.state.planId} />
      <div className="container">
        <Title />
        { this.state.view === 'activity-form' ? <ActivityForm planId={this.state.planId}/> : <PlanForm setPlanId={this.setPlanId} setFormView={this.setFormView}/>}
      </div>
   </>
    );
  }
}
