<template>
  <div class="row q-mb-sm">
    <q-input
      :value="dueDate"
      clearable
      label="Due date"
      outlined
      @input="$emit('update:dueDate', $event)"
    >
      <template v-slot:append>
        <q-icon
          name="event"
          class="cursor-pointer"
        >
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              :value="dueDate"
              @input="onQDateInput"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'ModalDueDateVue',
  props: { dueDate: { type: String, default: '' } },
  methods: {
    onQDateInput(event) {
      this.$refs.qDateProxy.hide();
      this.$emit('update:dueDate', event);
    },
  },
};
</script>

<style scoped>

</style>
