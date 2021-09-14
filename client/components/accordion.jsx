import React from 'react';

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activityId: null,
      planId: parseInt(this.props.plan),
      activities: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const eventTargetId = parseInt(event.target.getAttribute('id'));
    if (this.state.activityId === null) {
      this.setState({ activityId: eventTargetId });
    } else if (this.state.activityId === eventTargetId) {
      this.setState({ activityId: null });
    } else if (this.state.activityId !== eventTargetId) {
      this.setState({ activityId: eventTargetId });
    }
  }

  componentDidMount() {
    fetch(`api/activities/${this.state.planId}`)
      .then(response => response.json())
      .then(result => {
        this.setState({ activities: result });
      });
  }

  render() {
    let actId;
    const activitiesMap = this.state.activities.map(activity => {
      if (activity.activityId === this.state.activityId) {
        actId = 'height-5-rem';
      } else {
        actId = 'height-0';
      }
      return (
               <div key={activity.activityId}>
                  <div onClick={this.handleClick} className="col-11 lightblue rounded-top border-top border-start border-end border-dark">
                    <h4 className="margin-0 p-2" id={activity.activityId}>
                      {activity.activityName}
                    </h4>
                  </div>
                  <div className={`overflow-scroll col-11 p-0 rounded-bottom border border-dark ${actId}`}>
                    <p className="m-2 p-0">
                      {activity.details}
                    </p>
                  </div>
               </div>
      );
    });
    return (
      <div>
          {activitiesMap}
      </div>
    );
  }
}