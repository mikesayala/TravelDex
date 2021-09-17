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
    this.callPlansApi = this.callPlansApi.bind(this);
  }

  handleClick(event) {
    const eventTargetId = parseInt(event.target.getAttribute('id'));
    if (this.state.activityId === eventTargetId) {
      this.setState({ activityId: null });
    } else if (this.state.activityId !== eventTargetId) {
      this.setState({ activityId: eventTargetId });
    }
  }

  callPlansApi(plan) {
    if (plan) {
      fetch(`api/plans/${plan}/activities`)
        .then(response => response.json())
        .then(result => {
          this.setState({ activities: result });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.plan !== this.props.plan) {
      this.callPlansApi(this.props.plan);
    }
  }

  componentDidMount() {
    this.callPlansApi(this.state.planId);
  }

  render() {
    let actId;
    const activitiesMap = this.state.activities.map(activity => {
      if (activity.activityId === this.state.activityId) {
        actId = 'height-7-rem';
      } else {
        actId = 'height-0';
      }
      return (
               <div key={activity.activityId}>
                  <div onClick={this.handleClick} className="col-12 height-3 lightblue pointer rounded-top border-top border-start border-end border-dark">
                    <h4 className="margin-0 p-2 actName-font overflow-hidden" id={activity.activityId}>
                      {activity.activityName}
                      <a href={`#activityForm?activityId=${activity.activityId}`}>
                        <i className=" fas fa-pencil-alt"></i>
                      </a>
                    </h4>
                  </div>
                  <div className={`flow-auto col-12 rounded-bottom border border-dark ${actId}`}>
                    <p className="m-2 actDeets-font">
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
