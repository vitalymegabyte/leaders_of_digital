import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/main.component';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
