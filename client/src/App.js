import React from 'react';
import ChatListPage from './pages/ChatListPage/ChatListPage';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Layout from './components/Layout/Layout';
import store from './store/index';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
