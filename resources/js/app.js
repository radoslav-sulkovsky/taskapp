import Vue from "vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

import App from "./components/App.vue"

axios.get('/csrf-cookie').then(response => {
    console.log('csrf cookie set');
});

const app = new Vue({
    components: {
        App
    },
    vuetify,
    store,
    router,
    el: '#app'
});