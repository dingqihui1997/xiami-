import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      routes: [
        {
          path: '/',
          component: '@/pages/index',
          title: '首页',
        },
      ]
    },

  ],
  fastRefresh: {},
});
