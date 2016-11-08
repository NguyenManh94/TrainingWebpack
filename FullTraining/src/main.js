import helloWorld from './hello.js';
// import '../asset-static/libs/bootstrap/dist/css/bootstrap.min.css'; //config trong style roi
// import _ from 'lodash';
//Khi import lodash o day hay su dung webpack.ProvidePlugin() sử dụng
//ở config base thì đều như nhau cả
import 'lodash';
import background2 from './css/img/bg2.jpg';
import './jquery_global';
import 'bootstrap';

document.querySelector("#bg2").src = background2;
let demo = document.querySelector("#demo");
demo.innerHTML = helloWorld;
let objA = {
  userA: {
    name: 'manhnguyen',
    address: 'gia-lam',
    dev: 'technical'
  }
};
let objB = {
  userB: {
    name: 'mr.adam',
    address: 'new-york',
    dev: 'technical'
  }
};
console.log(_.merge(objA, objB));

if (module.hot) {
  module.hot.accept('./hello.js', function () {
    let c = require('./hello.js').default;
    demo.innerHTML = c;
  })
}