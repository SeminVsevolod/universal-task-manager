<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import electron from 'electron';

export default {
  name: 'App',
  mounted() {
    if (this.$q.platform.is.electron) {
      electron.ipcRenderer.on('show-settings', () => {
        this.$router.push('/settings');
      });
    }
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
