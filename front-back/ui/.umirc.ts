import {defineConfig} from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    {
      path: '/',
      menu: {
        name: 'Анкета',
        icon: 'ProfileOutlined',
      },
      component: '@/pages/Profile'
    },
  ],
});
