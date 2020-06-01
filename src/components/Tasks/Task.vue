<template>
  <q-item
    v-ripple
    clickable
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    @click="task.completed = !task.completed"
  >
    <q-item-section
      side
      top
    >
      <q-checkbox v-model="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{'task-strikethrough': task.completed}">
        {{ task.name }}
      </q-item-label>
    </q-item-section>

    <q-item-section
      side
    >
      <div class="row">
        <div class="column justify-center">
          <q-icon
            class="q-mr-xs"
            name="event"
            size="18px"
          />
        </div>
        <div class="column items-end">
          <q-item-label caption>
            {{ task.dueDate }}
          </q-item-label>
          <q-item-label caption>
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
