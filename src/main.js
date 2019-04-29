// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import VueClipboard from 'vue-clipboard2'

import 'element-ui/lib/theme-chalk/index.css'

// vue-codemirrot
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror,
  /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */
)

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'medium'
})
Vue.use(VueClipboard)
Vue.use(router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
