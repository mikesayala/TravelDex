import React from 'react';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      plans: [],
      activities: [],
      failed: false,
      isLoading: true
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

    })
      .catch(error => {
        console.error(error);
        this.setState({ failed: true, isLoading: false });
      });
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleToggleOff() {
    this.setState({ isOpen: false });
  }

  render() {
    const failed = this.state.failed;
    return (
     <div>
        <div onClick={this.handleToggleOff} className={`${this.state.isOpen ? 'background-is-active fixed' : 'background fixed'}`}></div>
        <i onClick={this.handleClick} className="fas fa-bars position-absolute"></i>
          <div className={`app-drawer app-drawer-background flow-auto ${this.state.isOpen ? '' : 'hidden'}`}>
            <h2 className="justify-center">
              <a href="#">Plans</a>
            </h2>
            {failed
              ? <h1 className="inter">
               Sorry there was an error connecting to the network! Please check your internet connection.
               </h1>
              : <ul className="justify-center text-overflow-clip">
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
               }
          </div>
       </div>
    );
  }
}

export default AppDrawer;
