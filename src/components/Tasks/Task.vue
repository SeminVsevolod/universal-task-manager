<template>
  <q-item
    v-ripple
    clickable
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    @click="updateTask({ id: id, updates: { completed: !task.completed }})"
  >
    <q-item-section
      side
      top
    >
      <q-checkbox
        :value="task.completed"
        class="no-pointer-events"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{'task-strikethrough': task.completed}">
        {{ task.name }}
      </q-item-label>
    </q-item-section>

    <q-item-section
      v-if="task.dueDate"
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

    <q-item-section side>
      <q-btn
        flat
        round
        dense
        color="negative"
        icon="delete"
        @click.stop="promptToDelete(id)"
      />
    </q-item-section>

    <q-dialog
      v-model="showCofirmToDelete"
      persistent
    >
      <q-card style="width: 300px">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Really delete?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="primary"
          />
          <q-btn
            v-close-popup
            flat
            label="Delete"
            color="red"
            @click="deleteTask({id: id})"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex';

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
  data() {
    return {
      showCofirmToDelete: false,
    };
  },
  methods: {
    ...mapActions('tasks', [
      'updateTask',
      'deleteTask',
    ]),
    promptToDelete() {
      this.showCofirmToDelete = true;
    },
  },
};
</script>

<style scoped>

</style>
