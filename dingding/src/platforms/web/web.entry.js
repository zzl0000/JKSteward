import Vue from 'vue';
import weex from 'weex-vue-render';
import api from '../../lib/api.js';
import storage from '../../lib/storage.js';
import validate from '../../lib/validate.js';
import { setTitle, setNfc, getNetwork, confirm ,toast} from '../../lib/util.js';
import { urlEncode } from '../../lib/urlEncode.js';
import crypto from 'crypto'

weex.init(Vue);
import App from '../../container/App.vue';
import Router from '../../container/router.js';

Vue.prototype.$api = api;
Vue.prototype.$crypto= crypto;
Vue.prototype.$storage = storage;
Vue.prototype.$isValidate = validate;
Vue.prototype.$setTitle = setTitle;
Vue.prototype.$setNfc = setNfc;
Vue.prototype.$getNetwork = getNetwork;
Vue.prototype.$urlEncode = urlEncode;
Vue.prototype.$confirm = confirm;
Vue.prototype.$toast = toast;


const { router } = Router(Vue);
new Vue(Vue.util.extend({
    el: '#root',
    router,
}, App));

