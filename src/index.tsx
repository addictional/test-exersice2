import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Store/Store';
import {Provider} from 'react-redux';
import {init} from './Store/Actions';

store.dispatch(init()).then(()=>{
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
})

