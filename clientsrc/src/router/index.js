import Vue from 'vue'
import Router from 'vue-router'
//@ts-ignore
import BookDetails from '../views/BookDetails.vue'
//@ts-ignore
import Inventory from "../views/Inventory.vue"
//@ts-ignore
import Order from '../views/Order.vue'
import Home from "../views/Home.vue"
// @ts-ignore
import Invoice from '../views/Invoice.vue'
import { authGuard } from "@bcwdev/auth0-vue"
import VueRouter from "vue-router"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: Inventory,
      beforeEnter: authGuard
    },
    {
      path: '/bookDetails/:bookId',
      name: 'bookDetails',
      component: BookDetails,
      beforeEnter: authGuard
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      beforeEnter: authGuard
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: Invoice,
      beforeEnter: authGuard
    },

    {
      path: "*",
      redirect: '/'
    },
    {
      path: "?#",
      redirect: '/'
    },
  ],

})