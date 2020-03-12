import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './store/index';

const RootComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<RootComponent />, document.getElementById('root'));
