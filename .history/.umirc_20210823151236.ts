import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: './src/pages/layout/layout',
      routes: [
        {
          path: '/',
          component: './src/pages/home',
          title: '首页',
        },
      ]
    },

  ],
  fastRefresh: {},
});
