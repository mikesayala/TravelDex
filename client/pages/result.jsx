import React from 'react';
import Accordion from '../components/accordion';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'results',
      plans: [],
      activities: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('/api/plans').then(response => response.json()),
      fetch('/api/activities').then(response => response.json())
    ]).then(([plansData, activityData]) => {
      this.setState({
        plans: plansData,
        activities: activityData
      });
    });
  }

  render() {
    return (
      <>
      <div>
        <img src="images/dlr.png" className="img-fluid " alt=""/>
      </div>
      <Accordion plans={this.state.plans} activities={this.state.activities} />
      </>
    );
  }
}
