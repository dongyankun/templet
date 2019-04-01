//import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

//Vue.use(ElementUI);


Vue.prototype.baseUrl = 'http://data.xinxueshuo.cn:80/nsi-1.0'
//Vue.prototype.baseUrl = 'http://192.168.0.40:8080/nsi-1.0'
Vue.prototype.$axios = axios
Vue.config.debug = true;
new Vue({
  el:'#app',
  components: { App },
  router:router,
  template:'<App></App>'
  //推荐使用
  //render: h => h(App)
  //替代
  //components: { App },
  //template:'<App></App>'
})
