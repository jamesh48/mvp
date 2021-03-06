import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import settings from './settings';
import testData from './Test\ Data/testData';
import profileTestData from'./Test\ Data/profileTestData';

ReactDOM.render(
  <React.StrictMode>
    <div>
    <App testData={testData} profileTestData={profileTestData} settings={settings}/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performaznce in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
