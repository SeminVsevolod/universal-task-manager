<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner class="bg-grey-3">
      <template #avatar>
        <q-icon
          name="check"
          color="secondary"
        />
      </template>
      No tasks to do today!
      <template #action>
        <q-btn
          flat
          color="secondary"
          label="Add Task"
          @click="$root.$emit('showAddTask')"
        />
      </template>
    </q-banner>
  </transition>
</template>

<script>
export default {
  name: 'NoTasks',
};
</script>

<style scoped>

</style>
