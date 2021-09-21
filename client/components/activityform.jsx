import React from 'react';
import Title from '../components/title';
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
      amount: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleActivityName = this.handleActivityName.bind(this);
  }

  componentDidMount() {
    if (this.props.planId) {
      this.setState({ planId: this.props.planId });
    }
    if (this.props.activityId) {
      fetch(`/api/activities/${this.props.activityId}`)
        .then(res => res.json())
        .then(activityId => {
          if (!activityId.error) {
            this.setState({
              activityName: activityId.activityName,
              details: activityId.details,
              planId: activityId.planId,
              amount: activityId.amount
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

  handleAmount(event) {
    this.setState({ amount: event.target.value });
  }

  handleSubmit(event) {
    const { activityName, details, amount, planId } = this.state;
    event.preventDefault();
    if (this.props.planId) {
      fetch('/api/activities/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          activityName,
          details,
          amount,
          planId
        })
      })
        .then(response => {
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
          details,
          amount
        })
      })
        .then(response => {
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
       <div>
        <Title />
        <div className=" mt-3 inter-500 d-flex justify-content-center">
          <h1 className="text-align-center">
            Activity Form
          </h1>
        </div>
        <div className=" d-flex justify-content-center flex-column-reverse">
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex row justify-content-center align-items-end">
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
                  <label htmlFor="amount" className="form-label">$</label>
                <input onChange={this.handleAmount} type="text" value={ this.state.amount } id="amount" className="col-12 form-control-lg" aria-label="Amount(to the nearest dollar)"/>
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
