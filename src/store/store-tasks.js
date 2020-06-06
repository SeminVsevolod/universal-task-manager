import Vue from 'vue';
import { uid, Notify } from 'quasar';
import { firebaseDb, firebaseAuth } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';

const $state = {
  tasks: {
    // J1J6VGHd5hd2AeknbIPBqtzRet22: {
    //   ID1: {
    //     name: 'Go to shop',
    //     completed: false,
    //     dueDate: '2019/05/12',
    //     dueTime: '18:30',
    //   },
    //   ID2: {
    //     name: 'Get bananas',
    //     completed: false,
    //     dueDate: '2019/05/13',
    //     dueTime: '14:00',
    //   },
    //   ID3: {
    //     name: 'Get apples',
    //     completed: true,
    //     dueDate: '2019/05/14',
    //     dueTime: '16:00',
    //   },
    // },
  },
  search: '',
  sortByKey: 'dueDate',
  tasksDownloaded: false,
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
  clearTasks(state) {
    state.tasks = {};
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSortByKey(state, value) {
    state.sortByKey = value;
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  },
};

const $actions = {
  updateTask({ dispatch }, payload) {
    // commit('updateTask', payload);
    dispatch('fbUpdateTask', payload);
  },
  deleteTask({ dispatch }, payload) {
    // commit('deleteTask', payload);
    dispatch('fbDeleteTask', payload);
  },
  addTask({ dispatch }, task) {
    const taskId = uid();
    const payload = {
      id: taskId,
      task,
    };
    // commit('addTask', payload);
    dispatch('fbAddTask', payload);
  },
  setSearch({ commit }, value) {
    commit('setSearch', value);
  },
  setSortByKey({ commit }, value) {
    commit('setSortByKey', value);
  },

  fbReadData({ commit }) {
    const userTasks = firebaseDb.ref(`tasks/${firebaseAuth.currentUser.uid}`);

    // initial check for data
    userTasks.once('value', () => {
      commit('setTasksDownloaded', true);
    }, (error) => {
      showErrorMessage(error && error.message ? error.message : 'Error: tasks cannot be shown');
      this.$router.replace('/auth');
    });

    // child added
    userTasks.on('child_added', (snapshot) => {
      const task = snapshot.val();
      const payload = {
        id: snapshot.key,
        task,
      };
      commit('addTask', payload);
    });

    // child changed
    userTasks.on('child_changed', (snapshot) => {
      const task = snapshot.val();
      const payload = {
        id: snapshot.key,
        updates: task,
      };
      commit('updateTask', payload);
    });

    // child deleted
    userTasks.on('child_removed', (snapshot) => {
      const taskId = snapshot.key;
      commit('deleteTask', { id: taskId });
    });
  },

  // eslint-disable-next-line no-empty-pattern
  fbAddTask({}, payload) {
    const taskRef = firebaseDb.ref(`tasks/${firebaseAuth.currentUser.uid}/${payload.id}`);
    taskRef.set(payload.task)
      .then(() => {
        Notify.create({ message: 'Task added' });
      })
      .catch((error) => {
        showErrorMessage(error && error.message ? error.message : 'Error: task cannot be added');
      });
  },

  // eslint-disable-next-line no-empty-pattern
  fbUpdateTask({}, payload) {
    const taskRef = firebaseDb.ref(`tasks/${firebaseAuth.currentUser.uid}/${payload.id}`);
    taskRef.update(payload.updates)
      .then(() => {
        const keys = Object.keys(payload.updates);
        if (!(keys.includes('completed') && keys.length === 1)) {
          Notify.create({ message: 'Task updated' });
        }
      })
      .catch((error) => {
        showErrorMessage(error && error.message ? error.message : 'Error: task cannot be updated');
      });
  },

  // eslint-disable-next-line no-empty-pattern
  fbDeleteTask({}, payload) {
    const taskRef = firebaseDb.ref(`tasks/${firebaseAuth.currentUser.uid}/${payload.id}`);
    taskRef.remove()
      .then(() => {
        Notify.create({ message: 'Task deleted' });
      })
      .catch((error) => {
        showErrorMessage(error && error.message ? error.message : 'Error: task cannot be deleted');
      });
  },
};

const $getters = {
  taskSorted: (state) => {
    const taskSorted = {};
    const keysOrdered = Object.keys(state.tasks);
    if (Object.keys(state.tasks).length) {
      keysOrdered.sort((a, b) => {
        const taskAProp = state.tasks[a] && state.tasks[a][state.sortByKey] ? state.tasks[a][state.sortByKey].toLowerCase() : '';
        const taskBProp = state.tasks[b] && state.tasks[b][state.sortByKey] ? state.tasks[b][state.sortByKey].toLowerCase() : '';
        if (taskAProp > taskBProp) { return 1; }
        if (taskAProp < taskBProp) { return -1; }
        return 0;
      });
      keysOrdered.forEach((key) => {
        taskSorted[key] = state.tasks[key];
      });
    }
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
