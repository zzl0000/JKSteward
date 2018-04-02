import Vue from 'vue';
import weex from 'weex-vue-render';
import api from '../../lib/api.js';
import storage from '../../lib/storage.js';


weex.init(Vue);
import App from '../../container/App.vue';
import Router from '../../container/router.js';

Vue.prototype.$api = api;
Vue.prototype.$storage = storage;

const { router } = Router(Vue);
new Vue(Vue.util.extend({
    el: '#root',
    router,
}, App));

