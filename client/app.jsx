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
    // const token = window.localStorage.getItem('react-context-jwt');
    // const user = token ? decodeToken(token) : null;
    // this.setState({ user, isAuthorizing: false });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'result') {
      return <Result />;
    }
    if (path === 'activityForm') {
      const params = window.location.hash.substring(21);
      return <ActivityForm planId={params} />;
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
