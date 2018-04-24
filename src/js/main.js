import Vue from 'vue';
import App from './components/app.vue';
import VeeValidate from 'vee-validate';
Vue.use( VeeValidate, {
    'events': 'blur'
} );

Vue.config.debug = true
Vue.config.devtools = true

new Vue(Vue.util.extend(App)).$mount('app')
