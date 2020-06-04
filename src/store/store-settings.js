// import Vue from 'vue';

// import { uid } from 'quasar';

const state = {
  settings: {
    show12HourTimeFormat: true,
    showTasksInOneList: false,
  },
};

const mutations = {
  setShow12HourTimeFormat($state, payload) {
    $state.settings.show12HourTimeFormat = payload;
  },
  setShowTasksInOneList($state, payload) {
    $state.settings.showTasksInOneList = payload;
  },
};

const actions = {
  setShow12HourTimeFormat({ commit }, payload) {
    commit('setShow12HourTimeFormat', payload);
  },
  setShowTasksInOneList({ commit }, payload) {
    commit('setShowTasksInOneList', payload);
  },
};

const getters = {
  settings: ($state) => $state.settings,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
