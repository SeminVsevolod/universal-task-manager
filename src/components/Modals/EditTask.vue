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

export default {
  name: 'AddTask',
  components: {
    ModalHeader: () => import('components/Modals/Shared/ModalHeader.vue'),
    ModalTaskName: () => import('components/Modals/Shared/ModalTaskName.vue'),
    ModalDueDate: () => import('components/Modals/Shared/ModalDueDate.vue'),
    ModalDueTime: () => import('components/Modals/Shared/ModalDueTime.vue'),
    ModalButtons: () => import('components/Modals/Shared/ModalButtons.vue'),
  },
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
    submitForm() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit,
      });
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
