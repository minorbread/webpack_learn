import  './css/common.css';
import layer from './components/layer/layer.js';

const App = function(layer) {
  var dom = document.getElementById('app');
  var layer = new layer();
  dom.innerHTML = layer.tpl({
    name: 'john',
    arr: ['apple', 'xiaomi', 'oppo']
  });
}

new App(layer);