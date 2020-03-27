import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Secure from '@/components/Secure'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Login',
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/secure',
      name: 'Secure',
      component: Secure
    }
  ]
})
