import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PostsListPage from './pages/PostsListPage/PostsListPage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';
import UserProfile from './pages/UserProfile/UserProfile';

const Navigation = () => (
  <Router>
    <Switch>
      <PrivateRoute component={PostsListPage} path="/posts" />
      <Route exact path="/">
        <Redirect to="/posts" />
      </Route>
      <PrivateRoute path="/profile/" component={UserProfile} />
      <Route path="/signin/" component={SignIn} />
      <Route path="/signup/" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Navigation;
