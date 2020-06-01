<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="text-h6">
        Add Task
      </div>
      <q-space />
      <q-btn
        v-close-popup
        flat
        round
        dense
        icon="close"
      />
    </q-card-section>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            v-model="taskToSubmit.name"
            clearable
            autofocus
            outlined
            label="Task name"
            class="col"
            :rules="[val => !!val || 'Field is required']"
          />
        </div>

        <div class="row q-mb-sm">
          <q-input
            v-model="taskToSubmit.dueDate"
            clearable
            label="Due date"
            outlined
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
                    v-model="taskToSubmit.dueDate"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div
          v-if="taskToSubmit.dueDate"
          class="row q-mb-sm"
        >
          <q-input
            v-model="taskToSubmit.dueTime"
            clearable
            label="Due time"
            outlined
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
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          type="submit"
          label="Save"
          color="primary"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddTask',
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: '',
        completed: false,
      },
    };
  },
  methods: {
    ...mapActions('tasks', [
      'addTask',
    ]),
    submitForm() {
      this.addTask(this.taskToSubmit);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
