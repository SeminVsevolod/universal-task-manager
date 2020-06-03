<template>
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
  },
};
</script>

<style scoped>

</style>
