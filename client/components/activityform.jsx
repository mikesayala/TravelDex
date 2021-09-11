import React from 'react';
export default class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'activity-form',
      activityName: '',
      location: '',
      details: '',
      planId: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleActivityName = this.handleActivityName.bind(this);
  }

  componentDidMount() {
    this.setState({ planId: this.props.planId.planId.planId });
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
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <>
        <div className="mt-5 d-flex justify-content-center flex-column-reverse">
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex justify-content-center align-items-end">
              <div className="col-10 col-sm-9">
                <div className="mb-3">
                  <label htmlFor="activity-name" className="form-label">Activity Name</label>
                  <input onChange={this.handleActivityName} required type="text" className="col-12 form-control-lg" id="activity-name" placeholder=""/>
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
                  <textarea onChange={this.handleDetails} className="form-control textarea" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10 col-sm-9">
                <div className="mb-3 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
