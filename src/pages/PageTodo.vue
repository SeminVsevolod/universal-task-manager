<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <div class="row q-mb-lg">
        <search class="col" />
        <sort class="col q-ml-sm" />
      </div>

      <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">
        No search results
      </p>

      <q-scroll-area class="q-scroll-area-tasks">
        <no-tasks
          v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"
        />

        <tasks-todo
          v-if="Object.keys(tasksTodo).length"
          type="todo"
          :tasks="tasksTodo"
        >
          <template #banner>
            <list-header class="bg-orange-4">
              Tasks to do
            </list-header>
          </template>
        </tasks-todo>

        <tasks-todo
          v-if="Object.keys(tasksCompleted).length"
          type="completed"
          :tasks="tasksCompleted"
        >
          <template #banner>
            <list-header class="bg-green-4">
              Tasks completed
            </list-header>
          </template>
        </tasks-todo>
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          round
          class="all-pointer-events"
          color="primary"
          size="24px"
          icon="add"
          @click="showAddTask = true"
        />
      </div>
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'PageTodo',
  components: {
    AddTask: () => import('../components/Modals/AddTask.vue'),
    TasksTodo: () => import('../components/Tasks/TasksTodo.vue'),
    NoTasks: () => import('../components/Tasks/NoTasks.vue'),
    ListHeader: () => import('../components/Shared/ListHeader.vue'),
    Search: () => import('../components/Shared/Search.vue'),
    Sort: () => import('../components/Shared/Sort.vue'),
  },
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapGetters('settings', [
      'settings',
    ]),
    ...mapState('tasks', ['search']),
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true;
    });
  },
};
</script>

<style scoped>
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>
