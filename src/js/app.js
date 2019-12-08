import Vue from 'vue';
import VueBus from 'vue-bus';

Vue.use(VueBus);

const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const app = new Vue({
    el: '#app',
});