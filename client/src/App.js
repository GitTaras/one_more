import React from 'react';
import ChatListPage from './pages/ChatListPage/ChatListPage';
import NotFound from './pages/NotFound/NotFound';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import store from './store/index';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/chat/" component={ChatListPage} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/signup/" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
