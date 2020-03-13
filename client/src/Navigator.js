import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ChatListPage from './pages/ChatListPage/ChatListPage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';

const Navigator = () => (
  <Router>
    <Switch>
      <PrivateRoute component={ChatListPage} exact path="/chat/" />
      <Route exact path="/signin/" render={props => <Layout component={SignIn} {...props} />} />
      <Route exact path="/signup/" render={props => <Layout component={SignUp} {...props} />} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Navigator;
