import { LocalStorage } from 'quasar';
import { firebaseAuth } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';

const $state = {
  loggedIn: false,
};

const $mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
    console.log('setLoggedIn->', state.loggedIn);
  },
};

const $actions = {
  registerUser({ commit }, payload) {
    console.log('registerUser', commit);
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  loginUser({ commit }, payload) {
    console.log('registerUser', commit);
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        commit('setLoggedIn', true);
        LocalStorage.set('loggedIn', true);
        this.$router.push('/').catch(() => {});
      } else {
        commit('setLoggedIn', false);
        LocalStorage.set('loggedIn', false);
        this.$router.replace('/auth').catch(() => {});
      }
    });
  },
};

const $getters = {
  settings: (state) => state.settings,
};

export default {
  namespaced: true,
  state: $state,
  mutations: $mutations,
  actions: $actions,
  getters: $getters,
};
