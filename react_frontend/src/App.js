import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/main.component';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
