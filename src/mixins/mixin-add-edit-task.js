export default {
  components: {
    ModalHeader: () => import('components/Modals/Shared/ModalHeader.vue'),
    ModalTaskName: () => import('components/Modals/Shared/ModalTaskName.vue'),
    ModalDueDate: () => import('components/Modals/Shared/ModalDueDate.vue'),
    ModalDueTime: () => import('components/Modals/Shared/ModalDueTime.vue'),
    ModalButtons: () => import('components/Modals/Shared/ModalButtons.vue'),
  },
  methods: {
    submitForm() {
      if (this.id) {
        this.updateTask({
          id: this.id,
          updates: this.taskToSubmit,
        });
      } else {
        this.addTask(this.taskToSubmit);
      }
      this.$emit('close');
    },
  },
};
