// import Vue from 'vue'
// import Router from 'vue-router'

import index from '../views/lottery/index.vue'
//Vue.use(Router)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: index,
    },{
    	path: '/index',
	    name: 'index',
	    component: index,
    }
  ]
})
