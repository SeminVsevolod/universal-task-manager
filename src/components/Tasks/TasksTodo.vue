<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    :leave-active-class="'animated zoomOut ' + type === 'todo' ? 'absolute-top' : ''"
  >
    <div :class="{'q-mt-lg': type === 'completed'}">
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
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['todo', 'completed'].includes(value);
      },
    },
    tasks: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
