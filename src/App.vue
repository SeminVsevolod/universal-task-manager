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
    this.handleAuthStateChange();
  },
  methods: {
    ...mapActions('settings', [
      'loadSettings',
    ]),
    ...mapActions('auth', [
      'handleAuthStateChange',
    ]),
  },
};
</script>
<style>
  .task-strikethrough {
    text-decoration: line-through;
  }
</style>
