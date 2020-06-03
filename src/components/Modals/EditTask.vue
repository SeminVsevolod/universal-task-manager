<template>
  <q-card>
    <modal-header>
      Edit Task
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
  props: {
    task: {
      type: Object,
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      taskToSubmit: {},
    };
  },
  mounted() {
    this.taskToSubmit = { ...this.task };
  },
  methods: {
    ...mapActions('tasks', [
      'updateTask',
    ]),
  },
};
</script>

<style scoped>

</style>
