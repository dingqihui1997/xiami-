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
          component: '@/pages/rotation/rotation.tsx',
          title: '轮播图管理',
        },
        {
          path: '/navigation',
          component: '@/pages/navigation/navigation.tsx',
          title: '导航管理',
        },
        {
          path: '/recommend',
          component: '@/pages/recommend/recommend',
          title: '推荐管理',
        },
        {
          path: '/user',
          component: '@/pages/user/user',
          title: '用户管理',
        },
        {
          path: '/goods',
          component: '@/pages/goods/goods',
          title: '商品管理',
        },
        {
          path: '/addgoods',
          component: '@/pages/addgoods/addgoods',
          title: '添加商品',
        },
        {
          path: '/categories',
          component: '@/pages/categories/categories',
          title: '商品分类',
        },
        {
          path: '/pattern',
          component: '@/pages/pattern/pattern',
          title: '商品模型',
        },
        {
          path: '/norms',
          component: '@/pages/norms/norms',
          title: '商品规格',
        },
        {
          path: '/parameter',
          component: '@/pages/parameter/parameter',
          title: '商品参数',
        },
        {
          path: '/specifications',
          component: '@/pages/specifications/specifications',
          title: '规格参数',
        },
        {
          path: '/seckill',
          component: '@/pages/seckill/seckill',
          title: '秒杀管理',
        },
        {
          path: '/coupon',
          component: '@/pages/coupon/coupon',
          title: '优惠券管理',
        },
        {
          path: '/order',
          component: '@/pages/order/order',
          title: '订单管理',
        },
        {
          path: '/notice',
          component: '@/pages/notice/notice',
          title: '通知管理',
        },
        {
          path: '/news',
          component: '@/pages/news/news',
          title: '客服消息',
        },
      ]
    },

  ],
  fastRefresh: {},
  locale: {
    default: 'zh-CN'
  }
});
