<template>
  <q-page class="q-pa-md">
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
import { mapGetters } from 'vuex';

export default {
  name: 'PageTodo',
  components: {
    AddTask: () => import('../components/Modals/AddTask.vue'),
    TasksTodo: () => import('../components/Tasks/TasksTodo.vue'),
    ListHeader: () => import('../components/Shared/ListHeader.vue'),
  },
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
  },
};
</script>
