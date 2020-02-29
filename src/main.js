import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import VueChatScroll from 'vue-chat-scroll'
import firebase from "firebase"
import "firebase/firestore";

Vue.use(VueChatScroll)

const config = {
  apiKey: "AIzaSyAsB8ll6v7BkBoTtAooUVUfYULK6QZ6DUo",
  authDomain: "goblin2-6069f.firebaseapp.com",
  storageBucket: "goblin2-6069f.appspot.com",
  projectId: "goblin2-6069f"
};
firebase.initializeApp(config);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
