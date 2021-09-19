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
    fetch(`api/plans/${this.state.planId}/activities`)
      .then(response => response.json())
      .then(result => {
        let total = 0;
        result.forEach(activity => {
          total += activity.amount;
        });
        this.props.setAmountTotal(total);
        this.setState({ activities: result });
      });
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
               <div onClick={this.handleClick} key={activity.activityId}>
                  <div id={activity.activityId} className="col-12 height-3 modal-row justify-content-between lightblue pointer rounded-top border-top border-start border-end border-dark">
                    <div className="row col-10 p-2">
                      <h4 id={activity.activityId} className="modal-row align-items-center col-10 margin-0 pl-2 actName-font">
                      {activity.activityName}
                      </h4>
                      <h4 className="inline pt-2 modal-row align-items-center col-2">${activity.amount || 0}</h4>
                    </div>
                      <a className="me-2" href={`#activityForm?activityId=${activity.activityId}`}>
                        <i className=" fas fa-pencil-alt"></i>
                      </a>
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
