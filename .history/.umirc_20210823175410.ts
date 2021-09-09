import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login/login',
      title: '登录',
    },
    {
      path: '/',
      component: '@/pages/layout/layout',
      routes: [
        {
          path: '/',
          component: '@/pages/home',
          title: '首页',
        },
        {
          path: '/rotation',
          component: '@/pages/rotation',
          title: '轮播图管理',
        },
        {
          path: '/navigation',
          component: '@/pages/navigation',
          title: '导航管理',
        },
        {
          path: '/recommend',
          component: '@/pages/recommend',
          title: '推荐管理',
        }
        {
          path: '/user',
          component: '@/pages/user',
          title: '用户管理',
        }
      ]
    },

  ],
  fastRefresh: {},
});
