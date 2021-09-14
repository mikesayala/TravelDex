import React from 'react';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      plans: [],
      activities: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleToggleOff = this.handleToggleOff.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('/api/plans').then(response => response.json()),
      fetch('/api/activities').then(response => response.json())
    ]).then(([plansData, activityData]) => {
      this.setState({
        plans: plansData,
        activities: activityData
      });
    });
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleToggleOff() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
     <div>
        <div onClick={this.handleToggleOff} className={`${this.state.isOpen ? 'background-is-active fixed' : 'background fixed'}`}></div>
        <i onClick={this.handleClick} className="fas fa-bars position-absolute"></i>
          <div className={`app-drawer flow-auto ${this.state.isOpen ? '' : 'hidden'}`}>
            <h2 className="justify-center">
              <a href="#">Plans</a>
            </h2>
            <ul className="justify-center">
              {
                this.state.plans &&
                this.state.plans.map(listItem =>
                  <div key={listItem.planId}>
                    <h4 id={listItem.planId}>
                      <a href={`#result?planId=${listItem.planId}`}>
                        {listItem.planName}
                      </a>
                    </h4>
                  </div>
                )
              }
            </ul>
          </div>
       </div>
    );
  }
}

export default AppDrawer;
