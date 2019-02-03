/**

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

var wahoo = {
  grit: 0,
  grace: 0,
  name: "Anon",
  avatarURL: 'https://cdn.images.express.co.uk/img/dynamic/4/590x/Lakers-locker-room-LeBron-James-NBA-news-Walton-1081752.jpg?r=1549184933782',
  readable: function() {
    return 'You are so great ' + this.name;
  }
}

function buildWahoo(grit, grace, name) {
  wahoo.grit = grit;
  wahoo.grace = grace;
  wahoo.name = name;
  return wahoo
}

const wahooElement = (
  <h1> 
      <img src={wahoo.avatarURL} alt=''></img>
      Hello, {buildWahoo(1.0, 1.0, "Selwyn").readable() }
  </h1>
)

// parameters are element to be rendered, parent component to attach to.
// in ReactNative const, let, and var must be explicity linked.
// javascript xml objects -> jsx lets us have html for our elements.
// it is an abstraction of a function so it can be used same as any other in js. 
ReactDOM.render(
  wahooElement,
  document.getElementById('root') 
) 

setTimeout(console.log(''), 7000)

/* type JSX.element
 * A function is pure if it doesn't modify any of its parameters.
 * These JXS elements must only use pure functions. 
 */
function Clock(props) {
  let clockElement = (
    <div>
      <h1> Look at my {props.type} clock!</h1>
      <h1> The Time is now: {new Date().toLocaleTimeString(props.time)}</h1>
    </div>
  )
  return clockElement
} 

/* Equivalent representation of jxs element */
class Welcome extends Component {
  constructor(){
    super(props) 
  }

  render() {
    return <h1> Hello{this.props.name} </h1>
  }
}

/* A function is pure if it doesn't modify any parameters. */
function tick() {
  // We can define custom reusable elements this way and immediately refer to them.
  const element = (
    <div>
      <Clock type='USA' time='en-US'></Clock>
      <Clock type='Arabic' time='ar-EG'></Clock>
    </div>  
  )
  ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000) 