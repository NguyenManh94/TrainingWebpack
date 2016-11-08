import helloWorld from './hello.js';
import './css/style-main.css';

let demo = document.querySelector("#demo");
demo.innerHTML = helloWorld;

if (module.hot) {
  module.hot.accept('./hello.js', function () {
    let c = require('./hello.js').default;
    demo.innerHTML = c;
  })
}