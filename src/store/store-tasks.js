import Vue from 'vue';
import { uid } from 'quasar';

const $state = {
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
  sortByKey: 'dueDate',
};

const $mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, payload) {
    Vue.delete(state.tasks, payload.id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSortByKey(state, value) {
    state.sortByKey = value;
  },
};

const $actions = {
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
  setSortByKey({ commit }, value) {
    commit('setSortByKey', value);
  },
};

const $getters = {
  taskSorted: (state) => {
    const taskSorted = {};
    const keysOrdered = Object.keys(state.tasks);
    keysOrdered.sort((a, b) => {
      const taskAProp = state.tasks[a][state.sortByKey].toLowerCase();
      const taskBProp = state.tasks[b][state.sortByKey].toLowerCase();
      if (taskAProp > taskBProp) { return 1; }
      if (taskAProp < taskBProp) { return -1; }
      return 0;
    });
    keysOrdered.forEach((key) => {
      taskSorted[key] = state.tasks[key];
    });
    return taskSorted;
  },
  tasksFiltered: (state, getters) => {
    const { taskSorted } = getters;
    const tasksFiltered = {};
    if (state.search) {
      Object.keys(taskSorted).forEach((key) => {
        const task = taskSorted[key];
        const taskNameLowerCase = task.name.toLowerCase();
        const searchLowerCase = state.search.toLowerCase();
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return taskSorted;
  },
  tasksTodo: (state, getters) => {
    const { tasksFiltered } = getters;
    const tasks = {};
    Object.keys(tasksFiltered).forEach((key) => {
      const task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    const { tasksFiltered } = getters;
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
  state: $state,
  mutations: $mutations,
  actions: $actions,
  getters: $getters,
};
