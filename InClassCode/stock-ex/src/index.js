import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function tick() {
  return fetch('https://api.iextrading.com/1.0/stock/aapl/price')
  .then((response) => response.json())
  .then((responseJson) => {
    ReactDOM.render(<App price={responseJson} />, document.getElementById('root'));
  })
  .catch((error) => console.log(error))
}
 
setInterval(tick, 1000)
