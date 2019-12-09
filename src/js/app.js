import Vue from 'vue';
import VueBus from 'vue-bus';
import draggable from 'vuedraggable';
import { directive as onClickaway } from 'vue-clickaway';

Vue.use(VueBus);
Vue.component('draggable', draggable);
Vue.directive('on-clickaway', onClickaway);

const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const app = new Vue({
    el: '#app',
});