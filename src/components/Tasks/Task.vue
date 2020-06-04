<template>
  <q-item
    v-ripple
    v-touch-hold:1000.mouse="showEditTaskModal"
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
      <q-item-label
        :class="{'task-strikethrough': task.completed}"
        v-html="$options.filters.searchHighlight(task.name, search)"
      />
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
            {{ task.dueDate | niceDate }}
          </q-item-label>
          <q-item-label caption>
            <small>{{ taskDueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row items-center">
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="edit"
          @click.stop="showEditTaskModal"
        />
        <q-btn
          flat
          round
          dense
          color="negative"
          icon="delete"
          @click.stop="promptToDelete(id)"
        />
      </div>
    </q-item-section>

    <q-dialog
      v-model="showConfirmToDelete"
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

    <q-dialog v-model="showEditTask">
      <edit-task
        :id="id"
        :task="task"
        @close="showEditTask = false"
      />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { date } from 'quasar';

const { formatDate } = date;

export default {
  name: 'Task',
  filters: {
    niceDate(value) {
      return formatDate(value, 'DD.MM.YYYY');
    },
    searchHighlight(value, search) {
      if (search) {
        const searchRegExp = new RegExp(search, 'ig');
        return value.replace(searchRegExp, (match) => `<span class="bg-yellow-6">${match}</span>`);
      }
      return value;
    },
  },
  components: {
    EditTask: () => import('components/Modals/EditTask.vue'),
  },
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
      showConfirmToDelete: false,
      showEditTask: false,
    };
  },
  computed: {
    ...mapState('tasks', ['search']),
    ...mapGetters('settings', ['settings']),
    taskDueTime() {
      if (this.settings.show12HourTimeFormat) {
        return formatDate(`${this.task.dueDate} ${this.task.dueTime}`, 'h:mmA');
      }
      return this.task.dueTime;
    },
  },
  methods: {
    ...mapActions('tasks', [
      'updateTask',
      'deleteTask',
    ]),
    showEditTaskModal() {
      this.showEditTask = true;
    },
    promptToDelete() {
      this.showConfirmToDelete = true;
    },
  },
};
</script>

<style scoped>

</style>
