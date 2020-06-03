<template>
  <div class="row q-mb-sm">
    <q-input
      v-select-all
      :value="name"
      clearable
      autofocus
      outlined
      label="Task name"
      class="col"
      :rules="[val => !!val || 'Field is required']"
      @input="$emit('update:name', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'ModalTaskName',
  directives: {
    selectAll: {
      inserted(el) {
        const input = el.querySelector('.q-field__native');
        input.addEventListener('focus', () => {
          if (input.value.length) {
            input.select();
          }
        });
      },
    },
  },
  props: { name: { type: String, default: '' } },
};
</script>

<style scoped>

</style>
