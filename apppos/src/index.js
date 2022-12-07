import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App.js';
//import Table from './components/table';
import 'bootstrap/dist/css/bootstrap.css';


const element = <React.Fragment>
  <App />
</React.Fragment>;


ReactDOM.render(element, document.getElementById("root"));