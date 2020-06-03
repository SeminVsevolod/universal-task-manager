<template>
  <q-page class="q-pa-md">
    <search class="row q-mb-lg" />

    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">
      No search results
    </p>

    <no-tasks
      v-if="!Object.keys(tasksTodo).length && !search"
    />

    <tasks-todo
      v-if="Object.keys(tasksTodo).length"
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
      :tasks="tasksCompleted"
    >
      <template #banner>
        <list-header class="bg-green-4">
          Tasks completed
        </list-header>
      </template>
    </tasks-todo>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        round
        class=""
        color="primary"
        size="24px"
        icon="add"
        @click="showAddTask = true"
      />
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
  },
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapState('tasks', ['search']),
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true;
    });
  },
};
</script>
