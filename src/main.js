import Vue from 'vue'
import App from './App'
import BuyDialogComponent from '@/components/Common/BuyDialog'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase/app'
import vuetify from './plugins/vuetify'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad)
Vue.use(Vuetify)
Vue.component('app-buy-dialog', BuyDialogComponent)
Vue.config.productionTip = false

new Vue({
  vuetify,
	Vuetify,
	router,
  store,
  VueLazyLoad,
	render: h => h(App),
	created () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAntHtCjsk79WghJU4ZBIZJ-wPAtf87jRM",
    authDomain: "flightsim-store.firebaseapp.com",
    databaseURL: "https://flightsim-store.firebaseio.com",
    projectId: "flightsim-store",
    storageBucket: "flightsim-store.appspot.com",
    messagingSenderId: "643328941411",
    appId: "1:643328941411:web:1c16d6f2d7581e4b7f8756"
  }
  // Initialize Firebase
  
  fb.initializeApp(firebaseConfig)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchProducts')
  }
}).$mount('#app')
