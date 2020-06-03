<template>
  <q-select
    v-model="sortByKeyModel"
    filled
    emit-value
    map-options
    :options="options"
    label="Sort by"
    stack-label
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Sort',
  data() {
    return {
      options: [
        { label: 'Name', value: 'name' },
        { label: 'Date', value: 'dueDate' },
      ],
    };
  },
  computed: {
    ...mapState('tasks', ['sortByKey']),
    sortByKeyModel: {
      get() {
        return this.sortByKey;
      },
      set(value) {
        this.setSortByKey(value);
      },
    },
  },
  methods: {
    ...mapActions('tasks', ['setSortByKey']),
  },
};
</script>

<style scoped>
  .q-select {
    flex: 0 0 112px;
  }
</style>
