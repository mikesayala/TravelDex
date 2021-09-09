import React from 'react';

export default class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.updateState(true);
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-center flex-column-reverse">
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex justify-content-center align-items-end">
              <div className="col-10">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Activity Name</label>
                  <input required type="text" className="col-12 form-control" id="exampleFormControlInput1" placeholder=""/>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10">
                <div className="mb-3">
                 <label htmlFor="formFile" className="form-label">Image(optional)</label>
                <input className="form-control" type="file" id="formFile"></input>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Location</label>
                  <input required type="text" className="col-12 form-control" id="exampleFormControlInput1" placeholder=""/>
              </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Activity</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10">
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
