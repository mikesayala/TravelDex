import React from 'react';
import ActivityForm from './components/activityform';
import parseRoute from './lib/parse-route';
import Home from './pages/home';
import Result from './pages/result';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const planId = this.state.route.params.get('planId');
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'result') {
      return <Result planId={planId} />;
    }
    if (path === 'activityForm') {
      const activityId = this.state.route.params.get('activityId');
      return <ActivityForm activityId={activityId} />;
    }
  }

  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}
