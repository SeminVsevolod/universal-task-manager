<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    :leave-active-class="'animated zoomOut ' + type === 'todo' ? 'absolute-top' : ''"
  >
    <div :class="{'q-mt-lg': type === 'completed' && !settings.showTasksInOneList}">
      <slot
        v-if="!settings.showTasksInOneList"
        name="banner"
      />
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
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters('settings', [
      'settings',
    ]),
  },
};
</script>

<style scoped>

</style>
