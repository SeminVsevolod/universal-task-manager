<template>
  <div
    class="row q-mb-sm"
  >
    <q-input
      :value="dueTime"
      clearable
      label="Due time"
      outlined
      @input="$emit('update:dueTime', $event)"
    >
      <template v-slot:append>
        <q-icon
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              :value="dueTime"
              @input="$emit('update:dueTime', $event)"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'ModalDueTime',
  props: { dueTime: { type: String, default: '' } },
};
</script>

<style scoped>

</style>
