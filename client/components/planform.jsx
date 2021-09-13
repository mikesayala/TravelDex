import React from 'react';
export default class PlanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planName: '',
      date: '',
      pictureUrl: '',
      planId: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handlePicture = this.handlePicture.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ planName: event.target.value });
  }

  handleDate(event) {
    this.setState({ date: event.target.value });
  }

  handlePicture(event) {
    this.setState({ pictureUrl: event.target.value });
  }

  handleSubmit(event) {
    const { planName, date, pictureUrl } = this.state;
    event.preventDefault();
    fetch('/api/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        planName,
        date,
        pictureUrl
      })
    })
      .then(response => response.json())
      .then(responseBodyData => {
        this.props.setPlanId({ planId: responseBodyData });
        this.props.setFormView('activity-form');
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (

        <>
          <div className="row align-center d-flex justify-content-center">
            <div className="col-3 d-flex justify-content-center flex-col-rev height-25">
              <img src="images/computer.png" alt="comp"/>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row d-flex justify-content-center">
            <div className="col-10 col-sm-9">
              <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Plan Name</label>
                  <input required onChange={this.handleChange} value={this.state.planName} type="text" className="col-12 form-control-lg" id="exampleFormControlInput1" placeholder=""/>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Date</label>
                  <input required onChange={this.handleDate} type="date" className="col-12 form-control-lg" id="exampleFormControlInput1" placeholder=""/>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Image</label>
                    <input onChange={this.handlePicture} type="text" className="col-12 form-control-lg" id="exampleFormControlInput1" placeholder=""/>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-12 flex-col-rev height-5">
                  <h4 className="text-center">Lets get Started</h4>
              </div>
            </div>
            <div className="row d-flex position-relative top-100 justify-content-center">
              <div className="col-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Start</button>
              </div>
            </div>
          </div>
          </form>
          </>
    );
  }
}
