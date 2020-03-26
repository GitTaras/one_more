import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PostsListPage from './pages/PostsListPage/PostsListPage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';
import UserProfile from './pages/UserProfile/UserProfile';

const Navigation = () => (
  <Router>
    <Switch>
      <PrivateRoute component={PostsListPage} exact path="/" />
      <PrivateRoute exact path="/profile/" component={UserProfile} />
      <Route exact path="/signin/" component={SignIn} />
      <Route exact path="/signup/" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Navigation;
