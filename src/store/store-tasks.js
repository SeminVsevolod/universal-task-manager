import Vue from 'vue';
import { uid } from 'quasar';

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
  search: '',
};

const mutations = {
  updateTask($state, payload) {
    Object.assign($state.tasks[payload.id], payload.updates);
  },
  deleteTask($state, payload) {
    Vue.delete($state.tasks, payload.id);
  },
  addTask($state, payload) {
    Vue.set($state.tasks, payload.id, payload.task);
  },
  setSearch($state, value) {
    $state.search = value;
  },
};

const actions = {
  updateTask({ commit }, payload) {
    commit('updateTask', payload);
  },
  deleteTask({ commit }, payload) {
    commit('deleteTask', payload);
  },
  addTask({ commit }, task) {
    const taskId = uid();
    const payload = {
      id: taskId,
      task,
    };
    commit('addTask', payload);
  },
  setSearch({ commit }, value) {
    commit('setSearch', value);
  },
};

const getters = {
  tasksFiltered: ($state) => {
    const tasksFiltered = {};
    if ($state.search) {
      Object.keys($state.tasks).forEach((key) => {
        const task = $state.tasks[key];
        const taskNameLowerCase = task.name.toLowerCase();
        const searchLowerCase = $state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return $state.tasks;
  },
  tasksTodo: ($state, $getters) => {
    const { tasksFiltered } = $getters;
    const tasks = {};
    Object.keys(tasksFiltered).forEach((key) => {
      const task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: ($state, $getters) => {
    const { tasksFiltered } = $getters;
    const tasks = {};
    Object.keys(tasksFiltered).forEach((key) => {
      const task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
