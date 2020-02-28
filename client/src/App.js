import React from 'react';
import ChatListPage from './pages/ChatListPage';
import styles from './App.module.css';
import store from './store/index';
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={store}>
    <div className={styles.container}>
      <ChatListPage />
    </div>
  </Provider>
);

export default App;