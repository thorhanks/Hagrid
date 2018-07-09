import Vue from "vue";
import Vuex from "vuex";
import ThePage from "./components/the-page.vue";
import store from "./state/store";

function init() {
    Vue.use(Vuex);
    new Vue({
        el: "#page-vue-container",
        store: new Vuex.Store(store),
        components: {ThePage},
        render: h => h(ThePage),
    });
}

if (document.readyState != "loading") init();
else document.addEventListener("DOMContentLoaded", init);
