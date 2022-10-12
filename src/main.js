import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';
var sha256 = require('js-sha256');
import { VueSpinners } from '@saeris/vue-spinners'
import SignaturePad from 'signature_pad'

import Highchart from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
import stockInit from "highcharts/modules/stock";

import VueWysiwyg from '@mycure/vue-wysiwyg';



Vue.use(VueWysiwyg);
stockInit(Highchart);
Highchart.setOptions({
  lang: {
    thousandsSep: ','
  }
})
Vue.use(HighchartsVue);

Vue.use(VueSpinners)
Vue.use(require('vue-moment'));
Vue.use(VueOnsen);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  sha256,
  SignaturePad,
  render: h => h(App)
}).$mount('#app')

