import React from 'react';
import Accordion from '../components/accordion';
import AppDrawer from '../components/app-drawer';
import Modal from '../components/modal';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'results',
      isOpen: false,
      plan: null,
      amountTotal: 0,
      isLoading: true,
      failed: false
    };
    this.showModal = this.showModal.bind(this);
    this.handleTrash = this.handleTrash.bind(this);
    this.setAmountTotal = this.setAmountTotal.bind(this);
  }

  componentDidMount() {
    fetch(`/api/plans/${this.props.planId}`).then(response => response.json())
      .then(planData => {
        this.setState({ plan: planData, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false, failed: true });
        console.error(err);
      });
  }

  setAmountTotal(total) {
    this.setState({ amountTotal: total });
  }

  handleTrash(e) {
    this.setState({ isOpen: true });
  }

  showModal(e) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    if (this.state.isLoading) {
      return <div className="d-flex justify-content-center spinner-height align-items-center">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>;
    }
    const plan = this.state.plan;
    return (
       <>
       <AppDrawer />
        <Modal planId={plan.planId} onClose={this.showModal} isOpen={this.state.isOpen} />
        {this.state.failed && <h1>request failed please try again</h1>}
        <div className="container">
           <div className="d-flex row">
             <div className="col-12 col-sm-6 p-0 d-flex h-25 justify-content-center">
               <img src={plan.pictureUrl} className=" rounded-bottom pictureUrl h-25 p-0 m-0" alt=""/>
             </div>
             <div className="col-12 h-100 col-sm-6">
                <div className="d-flex kite-one pt-1 justify-content-center text-center">
                  <h2>TravelDex</h2>
                </div>
                <div className="col-12 modal-row align-items-center justify-content-between">
                  <h4 className="m-1 plan me-3">
                    {plan.date}
                  </h4>
                  <h1 className="mt-2 kite-one">
                    ${this.state.amountTotal}
                  </h1>
                </div>
                <h1 className="m-1 plan">
                  {plan.planName}
                <i onClick={this.handleTrash} className="pointer trash relative-5ish fas fa-trash"></i>
                </h1>
                <a href={`#activityForm?planId=${plan.planId}`} className="d-flex justify-content-end margin-3">
                  <button className="mb-2 btn transform btn-primary">Add</button>
                </a>
                <Accordion setAmountTotal={this.setAmountTotal} plan={plan.planId} />
             </div>
           </div>
        </div>
      </>

    );
  }
}
