import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  onClose(e) {
    this.props.onClose && this.props.onClose(e);
  }

  handleDelete(event) {
    fetch(`/api/activities/${this.props.planId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        if (data.status === 204) {
          fetch(`/api/plans/${this.props.planId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(newResponse => {
              alert('successfully deleted');
              window.location.hash = '#';
            });
        }
      });
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }
    return (
      <div>
        <div className="modal-background fixed"></div>
        <div className="modal-container row">
          <div className="row">
            <div className="moodal">
              <h2 className="text-center mt-4">
                Delete Plan?
                </h2>
              <div className="modal-row justify-around">
                <button onClick={this.onClose} className="delete-no-button">No</button>
              <button onClick={this.handleDelete} className="delete-yes-button">Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
