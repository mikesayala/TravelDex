import React from 'react';
import Accordion from '../components/accordion';
import Modal from '../components/modal';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'results',
      isOpen: false,
      plan: null
    };
    this.showModal = this.showModal.bind(this);
    this.handleTrash = this.handleTrash.bind(this);
  }

  componentDidMount() {
    fetch(`/api/plans/${this.props.planId}`).then(response => response.json())
      .then(planData => {
        this.setState({ plan: planData });
      });
  }

  handleTrash(e) {
    this.setState({ isOpen: true });
  }

  showModal(e) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const plan = this.state.plan;
    if (plan === null) {
      return <div>...loading</div>;
    }
    return (
       <>
        <Modal planId={plan.planId} onClose={this.showModal} isOpen={this.state.isOpen} />
        <div className="container">
           <div className="d-flex row">
             <div className="col-12 col-sm-6 p-0 d-flex h-25 justify-content-center">
               <img src={plan.pictureUrl} className=" pictureUrl h-25 p-0 m-0" alt=""/>
             </div>
             <div className="col-12 h-100 col-sm-6">
                <h2 className="m-1 plan me-3">
                  {plan.date}
                </h2>
                <h1 className="m-1 plan">
                  {plan.planName}
                <i onClick={this.handleTrash} className="relative-5ish fas fa-trash"></i>
                </h1>
                <a href={`#activityForm?planId=${plan.planId}`} className="d-flex justify-content-end margin-3">
                  <button className="mb-2 btn btn-primary">Add</button>
                </a>
                <Accordion plan={plan.planId} />
             </div>
           </div>
        </div>
      </>

    );
  }
}
