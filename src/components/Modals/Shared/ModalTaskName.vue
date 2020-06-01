<template>
  <div class="row q-mb-sm">
    <q-input
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
  props: { name: { type: String, default: '' } },
};
</script>

<style scoped>

</style>
