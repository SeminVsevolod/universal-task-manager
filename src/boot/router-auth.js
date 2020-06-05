import { LocalStorage } from 'quasar';

export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem('loggedIn');
    if (!loggedIn && to.path !== '/auth') {
      next('/auth');
    } else {
      next();
    }
  });
};
