import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: './src/pages/layout/layout.tsx',
      routes: [
        {
          path: '/',
          component: './src/pages/home.tsx',
          title: '首页',
        },
      ]
    },

  ],
  fastRefresh: {},
});
