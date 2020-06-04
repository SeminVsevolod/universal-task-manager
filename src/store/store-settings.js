import { LocalStorage } from 'quasar';

const $state = {
  settings: {
    show12HourTimeFormat: true,
    showTasksInOneList: false,
  },
};

const $mutations = {
  setShow12HourTimeFormat(state, payload) {
    state.settings.show12HourTimeFormat = payload;
  },
  setShowTasksInOneList(state, payload) {
    state.settings.showTasksInOneList = payload;
  },
  setSettings(state, payload) {
    Object.assign(state.settings, payload);
  },
};

const $actions = {
  setShow12HourTimeFormat({ commit, dispatch }, payload) {
    commit('setShow12HourTimeFormat', payload);
    dispatch('saveSettings');
  },
  setShowTasksInOneList({ commit, dispatch }, payload) {
    commit('setShowTasksInOneList', payload);
    dispatch('saveSettings');
  },
  saveSettings({ state }) {
    LocalStorage.set('settings', state.settings);
  },
  loadSettings({ commit }) {
    const settings = LocalStorage.getItem('settings');
    if (settings) {
      commit('setSettings', settings);
    }
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
