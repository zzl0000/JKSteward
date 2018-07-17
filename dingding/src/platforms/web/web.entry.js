import Vue from 'vue';
import weex from 'weex-vue-render';
import api from '../../lib/api.js';
import storage from '../../lib/storage.js';
import validate from '../../lib/validate.js';
import { setTitle } from '../../lib/util.js';
import crypto from 'crypto'

weex.init(Vue);
import App from '../../container/App.vue';
import Router from '../../container/router.js';

Vue.prototype.$setTitle = setTitle;
Vue.prototype.$api = api;
Vue.prototype.$crypto= crypto;
Vue.prototype.$storage = storage;
Vue.prototype.$isValidate = validate;
const { router } = Router(Vue);
new Vue(Vue.util.extend({
    el: '#root',
    router,
}, App));

