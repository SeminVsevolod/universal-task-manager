<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  mounted() {
    this.loadSettings();
  },
  methods: {
    ...mapActions('settings', [
      'loadSettings',
    ]),
  },
};
</script>
<style>
  .task-strikethrough {
    text-decoration: line-through;
  }
</style>
