// import { LocalStorage } from 'quasar';
import { firebaseAuth } from 'boot/firebase';

const $state = {
  settings: {

  },
};

const $mutations = {

};

const $actions = {
  registerUser({ commit }, payload) {
    console.log('registerUser', payload, commit);
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // if (errorCode == 'auth/weak-password') {
      //   alert('The password is too weak.');
      // } else {
      //   alert(errorMessage);
      // }
        console.log('error', error);
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
