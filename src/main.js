import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.projectURL = "https://mindtalk.shoplic.store";

new Vue({
  render: h => h(App),
}).$mount('#app')