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
import { selectAll } from 'src/directives/directive-select-all';

export default {
  name: 'ModalTaskName',
  directives: {
    selectAll,
  },
  props: { name: { type: String, default: '' } },
};
</script>

<style scoped>

</style>
