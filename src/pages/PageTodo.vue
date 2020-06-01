<template>
  <q-page class="q-pa-md">
    <q-list
      separator
      bordered
    >
      <task
        v-for="(task, taskKey) in tasks"
        :id="taskKey"
        :key="taskKey"
        :task="task"
      />
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageTodo',
  components: {
    Task: () => import('../components/Tasks/Task.vue'),
  },
  computed: {
    ...mapGetters('tasks', ['tasks']),
  },
};
</script>
