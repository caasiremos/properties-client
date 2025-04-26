import { createRouter, createWebHistory } from 'vue-router';
import AgentLayout from '../layouts/AgentLayout.vue';
import GuestLayout from '../layouts/GuestLayout.vue';
import Home from '../views/Home.vue';
import Buy from '../views/Buy.vue';
import Rent from '../views/Rent.vue';
import Sell from '../views/Sell.vue';
import Agents from '../views/Agents.vue';
import Properties from '../views/Agents/Properties.vue';
import CreateProperty from '../views/Agents/CreateProperty.vue';
import Wallet from '../views/Agents/Wallet.vue';
import News from '../views/News.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Agents/Dashboard.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import EmailVerified from '../views/EmailVerified.vue';
import { useStorage } from '@vueuse/core';
import Profile from '../views/Agents/Profile.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Auth Routes
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: EmailVerified,
      meta: {
        title: 'Email Verified'
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: {
        title: 'Forgot Password'
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: {
        title: 'Reset Password'
      }
    },

    // Guest Routes
    {
      path: '/',
      component: GuestLayout,
      meta: { requiresAuth: false },
      children: [
        { path: '', component: Home },
        { path: 'buy', component: Buy },
        { path: 'rent', component: Rent },
        { path: 'sell', component: Sell },
        { path: 'agents', component: Agents },
        { path: 'news', component: News },
        { path: 'news/:id', component: ArticleDetail },
      ]
    },
    // Agent Routes
    {
      path: '/agent',
      component: AgentLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', component: Dashboard },
        { path: 'properties', component: Properties },
        { path: 'properties/create', component: CreateProperty },
        { path: 'wallet', component: Wallet },
        { path: 'profile', component: Profile },
        // { path: 'properties/:id/edit', component: EditProperty },
      ]
    },
  ]
});

// Check if user is authenticated
const isAuthenticated = () => {
  const token = useStorage('ACCESS_TOKEN');
  return !!token.value;
};

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // Redirect authenticated users away from public routes
  if (!requiresAuth && isAuthenticated()) {
    return next(`/agent`)
  }

  // Redirect unauthenticated users to login
  if (requiresAuth && !isAuthenticated()) {
    return next('/login')
  }

  // Proceed with navigation
  next()
})

export default router;