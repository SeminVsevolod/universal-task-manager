import { LocalStorage, Loading } from 'quasar';
import { firebaseAuth } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';

const $state = {
  loggedIn: false,
};

const $mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
};

const $actions = {
  // eslint-disable-next-line no-empty-pattern
  registerUser({ }, payload) {
    Loading.show();
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  // eslint-disable-next-line no-empty-pattern
  loginUser({ }, payload) {
    Loading.show();
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      Loading.hide();
      if (user) {
        commit('setLoggedIn', true);
        LocalStorage.set('loggedIn', true);
        this.$router.push('/');
        dispatch('tasks/fbReadData', null, { root: true });
      } else {
        commit('tasks/clearTasks', null, { root: true });
        commit('tasks/setTasksDownloaded', false, { root: true });
        commit('setLoggedIn', false);
        LocalStorage.set('loggedIn', false);
        this.$router.replace('/auth');
      }
    });
  },
};

export default {
  namespaced: true,
  state: $state,
  mutations: $mutations,
  actions: $actions,
};
