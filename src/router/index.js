import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

const originalPush = VueRouter.prototype.push;
// eslint-disable-next-line consistent-return
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  try {
    return originalPush.call(this, location).catch((err) => err);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('VueRouter.prototype.push error->', error);
  }
};
const originalReplace = VueRouter.prototype.replace;
// eslint-disable-next-line consistent-return
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  try {
    return originalReplace.call(this, location).catch((err) => err);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('VueRouter.prototype.replace error->', error);
  }
};
Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  return Router;
}
