import React from 'react';
import ActivityForm from './components/activityform';
import AppDrawer from './components/app-drawer';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Result from './pages/result';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      plans: [],
      failed: false
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    fetch('/api/plans').then(response => response.json())
      .then(planData => {
        this.setState({ plans: planData });
      });

    window.addEventListener('online', () => {
      this.setState({ failed: false });
    });

    window.addEventListener('offline', () => {
      this.setState({ failed: true });
    });
  }

  renderPage() {
    const planId = this.state.route.params.get('planId');
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'result') {
      return <Result key={planId} planId={planId} />;
    }
    if (path === 'activityForm') {
      const activityId = this.state.route.params.get('activityId');
      return <ActivityForm updatePlans={this.updatePlans} activityId={activityId} planId={planId} />;
    }
  }

  render() {
    return (
      <>
        {this.state.failed
          ? <div>
        <h1 className="d-flex m-1 justify-content-center text-center kite-one">Sorry, there was an error connecting to the network! Please check your internet connection.</h1>
      </div>
          : <div>
          <AppDrawer />
          {this.renderPage()}
          </div>
          }
          </>
    );
  }
}
