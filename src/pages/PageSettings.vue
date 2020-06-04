<template>
  <q-page padding>
    <q-list
      bordered
      padding
    >
      <q-item-label header>
        Settings
      </q-item-label>

      <q-item
        v-ripple
        tag="label"
      >
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            v-model="show12HourTimeFormat"
            color="primary"
          />
        </q-item-section>
      </q-item>

      <q-item
        v-ripple
        tag="label"
      >
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            v-model="showTasksInOneList"
            color="primary"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageSettings',

  computed: {
    ...mapGetters('settings', [
      'settings',
    ]),
    show12HourTimeFormat: {
      get() {
        return this.settings.show12HourTimeFormat;
      },
      set(value) {
        this.setShow12HourTimeFormat(value);
      },
    },
    showTasksInOneList: {
      get() {
        return this.settings.showTasksInOneList;
      },
      set(value) {
        this.setShowTasksInOneList(value);
      },
    },
  },
  methods: {
    ...mapActions('settings', [
      'setShow12HourTimeFormat',
      'setShowTasksInOneList',
    ]),
  },
};
</script>
