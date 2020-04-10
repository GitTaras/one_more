import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import NotFound from 'pages/NotFound';
import UserProfile from 'pages/UserProfile';
import PostsListPage from 'pages/PostsListPage';

const Navigation = () => (
  <Router>
    <Switch>
      <Route path="/sign-in/" component={SignIn} />
      <Route path="/sign-up/" component={SignUp} />
      <PrivateRoute component={Home} exact path="/posts" />
      <PrivateRoute path="/posts/users/:username" component={PostsListPage} />
      <PrivateRoute path="/posts/tags/:tag" component={PostsListPage} />
      <PrivateRoute path="/profile/" component={UserProfile} />
      <Route exact path="/">
        <Redirect to="/posts" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Navigation;
