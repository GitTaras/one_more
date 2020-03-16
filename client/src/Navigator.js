import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ChatListPage from './pages/ChatListPage/ChatListPage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';

const Navigator = () => (
  <Router>
    <Switch>
      <PrivateRoute component={ChatListPage} exact path="/chat/" />
      <Route exact path="/signin/" component={SignIn} />
      <Route exact path="/signup/" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Navigator;
