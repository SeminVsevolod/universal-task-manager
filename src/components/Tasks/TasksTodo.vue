<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    :leave-active-class="'animated zoomOut ' + leaveActiveClass"
  >
    <div class="q-mt-lg">
      <slot name="banner" />
      <q-list
        v-if="Object.keys(tasks).length"
        separator
        bordered
      >
        <task
          v-for="(task, taskKey) in tasks"
          :id="taskKey"
          :key="taskKey"
          :task="task"
        />
      </q-list>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TasksTodo',
  components: {
    Task: () => import('./Task.vue'),
  },
  props: {
    tasks: {
      type: Object,
      required: true,
    },
    leaveActiveClass: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>

</style>
