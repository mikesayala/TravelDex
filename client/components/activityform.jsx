import React from 'react';
import Title from '../components/title';
import AppDrawer from '../components/app-drawer';
export default class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'activity-form',
      activityName: '',
      location: '',
      details: '',
      planId: '',
      activityId: null,
      editForm: null,
      isEditing: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleActivityName = this.handleActivityName.bind(this);
  }

  componentDidMount() {
    if (this.props.planId) {
      this.setState({ planId: this.props.planId }, () => {
      });
    }
    if (this.props.activityId) {
      fetch(`/api/activities/${this.props.activityId}`)
        .then(res => res.json())
        .then(activityId => {
          if (!activityId.error) {
            this.setState({
              activityName: activityId.activityName,
              details: activityId.details,
              planId: activityId.planId
            });
          }
        });
    }
  }

  handleActivityName(event) {
    this.setState({ activityName: event.target.value });
  }

  handleLocation(event) {
    this.setState({ location: event.target.value });
  }

  handleDetails(event) {
    this.setState({ details: event.target.value });
  }

  handleSubmit(event) {
    const { activityName, details, planId } = this.state;
    event.preventDefault();
    const requirement = window.location.hash.slice(14, 20);
    if (requirement === 'planId') {
      fetch('/api/activities/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          activityName,
          details,
          planId
        })
      })
        .then(response => {
          response.json();
          event.target.reset();
          window.location.hash = `#result?planId=${this.state.planId}`;
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      const { activityName, details } = this.state;
      fetch(`/api/activities/${this.props.activityId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityName,
          details
        })
      })
        .then(response => {
          response.json();
          event.target.reset();
          window.location.hash = `#result?planId=${this.state.planId}`;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    return (
      <>
       <AppDrawer />
       <div>
        <Title />
        <div className="mt-5 d-flex justify-content-center flex-column-reverse">
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex justify-content-center align-items-end">
              <div className="col-10 col-sm-9">
                <div className="mb-3">
                  <label htmlFor="activity-name" className="form-label">Activity Name</label>
                  <input onChange={this.handleActivityName} value={ this.state.activityName } required type="text" className="col-12 form-control-lg" id="activity-name" placeholder=""/>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10 col-sm-9">
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input onChange={this.handleLocation} type="text" className="col-12 form-control-lg" id="location" placeholder=""/>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10 col-sm-9">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Details</label>
                  <textarea onChange={this.handleDetails} value={ this.state.details } className="form-control textarea" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10 col-sm-9">
                <div className="mb-3 d-flex justify-content-end">
                  <button className="btn btn-primary">
                    submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
       </div>
      </>
    );
  }
}
