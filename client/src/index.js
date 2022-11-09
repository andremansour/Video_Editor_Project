import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login/login.js';
import reportWebVitals from './reportWebVitals';
import test from './pages/test'
import Register from './pages/Register/Register.js'
import {BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom"




<script src="https://accounts.google.com/gsi/client" async defer ></script>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();