import React from 'react';

export default class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activityId: null,
      planId: parseInt(this.props.plan),
      activities: [],
      failed: false,
      isLoading: true
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
      })
      .catch(error => {
        console.error(error);
        this.setState({ failed: true, isLoading: false });
      });
  }

  render() {
    const failed = this.state.failed;
    let actId;
    return (
      <div>
          {this.state.activities.map(activity => {
            if (activity.activityId === this.state.activityId) {
              actId = 'height-7-rem';
            } else {
              actId = 'height-0';
            }
            return (
              <>
              {failed
                ? <div className="d-flex text-center">
                  <h1 className="m-0 inter">
               Sorry there was an error connecting to the network! Please check your internet connection.
                  </h1>
                </div>
                : <div className="margin-right-22" onClick={this.handleClick} key={activity.activityId}>
                  <div id={activity.activityId} className="ms-4 me-4 col-12 height-3 modal-row justify-content-between lightblue pointer rounded-top border-top border-start border-end border-dark">
                    <div className="row col-10 p-2">
                      <h4 id={activity.activityId} className="modal-row align-items-center inter-500 col-10 margin-0 pl-2 actName-font">
                      {activity.activityName}
                      </h4>
                      <h4 className="inline pt-2 modal-row align-items-center inter-500 col-2">${activity.amount || 0}</h4>
                    </div>
                      <a className="me-2" href={`#activityForm?activityId=${activity.activityId}`}>
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                  </div>
                  <div className={`ms-4 me-4 flow-auto col-12 rounded-bottom border border-dark ${actId}`}>
                    <p className="m-2 inter-500 activity-details-font">
                      {activity.details}
                    </p>
                  </div>
               </div>
    }
    </>
            );
          })}
      </div>
    );
  }
}
