<template>
  <q-page class="q-pa-md">
    <q-list
      v-if="Object.keys(tasks).length"
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
    Task: () => import('../components/Tasks/Task.vue'),
    AddTask: () => import('../components/Modals/AddTask.vue'),
  },
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters('tasks', ['tasks']),
  },
};
</script>
