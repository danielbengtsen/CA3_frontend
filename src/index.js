import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import AddressFetcher from './AddressFetcher';

const AppWithRouter = () => {
  return (
    <Router>
      <App/>
    </Router>
  );
};
ReactDOM.render(<AppWithRouter />, document.getElementById("root"));
