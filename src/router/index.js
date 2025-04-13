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
import ForgotPassword from '../views/ForgotPassword.vue';
import ResetPassword from '../views/ResetPassword.vue';
import EmailVerified from '../views/EmailVerified.vue';
import { useStorage } from '@vueuse/core';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/buy',
      name: 'buy',
      component: Buy,
      meta: {
        title: 'Buy'
      }
    },
    {
      path: '/rent',
      name: 'rent',
      component: Rent,
      meta: {
        title: 'Rent'
      }
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell,
      meta: {
        title: 'Sell'
      }
    },
    {
      path: '/agents',
      name: 'agents',
      component: Agents,
      meta: {
        title: 'Agents'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta: {
        title: 'News'
      }
    },
    {
      path: '/news/:id',
      name: 'article-detail',
      component: ArticleDetail,
      props: true,
      meta: {
        title: 'Article Detail'
      }
    },
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
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard'
      }
    }
  ]
});

// Check if user is authenticated
const isAuthenticated = () => {
  const token = useStorage('ACCESS_TOKEN');
  return !!token.value;
};

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/buy', '/rent', '/sell', '/agents', '/news', '/news/:id'];
  const authPages = ['/login', '/register', '/forgot-password', '/reset-password'];
  const authRequired = !publicPages.includes(to.path);
  const isAuthPage = authPages.includes(to.path);
  
  // Update document title
  document.title = `FindProperty 24 | ${to.meta.title || ''}`;

  // If route requires auth and user is not authenticated
  if (authRequired && !isAuthenticated()) {
    return next('/login');
  }

  // If user is authenticated and tries to access auth pages
  if (isAuthPage && isAuthenticated()) {
    return next('/dashboard');
  }

  next();
});

export default router;