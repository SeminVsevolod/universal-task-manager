import Vue from 'vue';

const state = {
  tasks: {
    ID1: {
      name: 'Go to shop',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30',
    },
    ID2: {
      name: 'Get bananas',
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '14:00',
    },
    ID3: {
      name: 'Get apples',
      completed: true,
      dueDate: '2019/05/14',
      dueTime: '16:00',
    },
  },
};

const mutations = {
  updateTask(State, payload) {
    Object.assign(State.tasks[payload.id], payload.updates);
  },
  deleteTask(State, payload) {
    Vue.delete(State.tasks, payload.id);
  },
};

const actions = {
  updateTask({ commit }, payload) {
    commit('updateTask', payload);
  },
  deleteTask({ commit }, payload) {
    commit('deleteTask', payload);
  },
};

const getters = {
  tasks: (State) => State.tasks,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
