import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';
import UserProfile from './pages/UserProfile/UserProfile';
import PostsListPage from './pages/PostsListPage/PostsListPage';

const Navigation = () => (
  <Router>
    <Switch>
      <PrivateRoute component={Home} path="/posts" />
      <Route exact path="/">
        <Redirect to="/posts" />
      </Route>
      <PrivateRoute path="/users/:username/posts" component={PostsListPage} />
      <PrivateRoute path="/profile/" component={UserProfile} />
      <Route path="/sign-in/" component={SignIn} />
      <Route path="/sign-up/" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Navigation;
