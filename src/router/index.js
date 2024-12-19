import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Buy from '../views/Buy.vue';
import Rent from '../views/Rent.vue';
import Sell from '../views/Sell.vue';
import Agents from '../views/Agents.vue';
import News from '../views/News.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/buy',
      name: 'buy',
      component: Buy
    },
    {
      path: '/rent',
      name: 'rent',
      component: Rent
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell
    },
    {
      path: '/agents',
      name: 'agents',
      component: Agents
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/news/:id',
      name: 'article-detail',
      component: ArticleDetail,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
});

export default router;