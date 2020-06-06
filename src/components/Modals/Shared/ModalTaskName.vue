<template>
  <div class="row q-mb-sm">
    <q-input
      v-select-all
      v-autofocus
      :value="name"
      clearable
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
import { autofocus } from 'src/directives/directive-autofocus';

export default {
  name: 'ModalTaskName',
  directives: {
    selectAll,
    autofocus,
  },
  props: { name: { type: String, default: '' } },
};
</script>

<style scoped>

</style>
