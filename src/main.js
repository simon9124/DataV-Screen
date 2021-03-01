import Vue from 'vue'
import App from './App.vue'

// iview
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // event Bus

new Vue({
  render: (h) => h(App),
}).$mount('#app')
