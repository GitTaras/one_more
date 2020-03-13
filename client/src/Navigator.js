import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ChatListPage from './pages/ChatListPage/ChatListPage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';

//todo move Layout to hocs or component
const Navigator = () => (
  <Router>
    <Layout>
      <Switch>
        <PrivateRoute component={ChatListPage} exact path="/chat/" />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/signup/" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default Navigator;
