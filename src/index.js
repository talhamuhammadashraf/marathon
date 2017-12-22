import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import moment from "moment"

// var m=moment(new Date().toLocaleDateString,"YYYY/MM/DD")
// console.log(m)
ReactDOM.render(
<MuiThemeProvider>
<App />
</MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
