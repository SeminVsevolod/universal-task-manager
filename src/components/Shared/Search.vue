<template>
  <q-input
    v-model="searchField"
    label="Search"
    outlined
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        class="cursor-pointer"
        @click="searchField = ''"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Search',
  computed: {
    ...mapState('tasks', ['search']),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
      },
    },
  },
  methods: {
    ...mapActions('tasks', ['setSearch']),
  },
};
</script>

<style scoped>

</style>
