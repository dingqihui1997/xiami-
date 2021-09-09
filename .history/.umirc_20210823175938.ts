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
        },
        {
          path: '/user',
          component: '@/pages/user',
          title: '用户管理',
        },
        {
          path: '/goods',
          component: '@/pages/goods',
          title: '商品管理',
        },
        {
          path: '/addgoods',
          component: '@/pages/addgoods',
          title: '添加商品',
        },
        {
          path: '/categories',
          component: '@/pages/categories',
          title: '商品分类',
        },
        {
          path: '/pattern',
          component: '@/pages/pattern',
          title: '商品模型',
        },
        {
          path: '/norms',
          component: '@/pages/norms',
          title: '商品规格',
        },
        {
          path: '/parameter',
          component: '@/pages/parameter',
          title: '商品参数',
        },
        {
          path: '/specifications',
          component: '@/pages/specifications',
          title: '规格参数',
        },
      ]
    },

  ],
  fastRefresh: {},
});
