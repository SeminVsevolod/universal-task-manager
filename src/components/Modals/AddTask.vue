<template>
  <q-card>
    <modal-header>
      Add Task
    </modal-header>

    <!-- QForm automatically validate fields with validation rules when a submit button pressed -->
    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <modal-task-name :name.sync="taskToSubmit.name" />
        <modal-due-date :due-date.sync="taskToSubmit.dueDate" />
        <modal-due-time
          v-if="taskToSubmit.dueDate"
          :due-time.sync="taskToSubmit.dueTime"
        />
      </q-card-section>

      <modal-buttons />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task';

export default {
  name: 'AddTask',
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false,
      },
    };
  },
  methods: {
    ...mapActions('tasks', [
      'addTask',
    ]),
  },
};
</script>

<style scoped>

</style>
