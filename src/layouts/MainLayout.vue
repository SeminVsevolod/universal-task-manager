<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="absolute-center">
          Universal Task Manager App
        </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          class="absolute-right"
          color="secondary"
          icon-right="account_circle"
          label="Login"
        />

        <q-btn
          v-else
          flat
          class="absolute-right"
          color="secondary"
          icon-right="account_circle"
          label="Logout"
          @click="logoutUser"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="(link, linkIndex) in essentialLinks"
          :key="linkIndex"
          v-bind="link"
          :label="link.title"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-primary"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
    >
      <q-list dark>
        <q-item-label
          header
          class="text-grey-4"
        >
          Navigation
        </q-item-label>
        <nav-link
          v-for="link in essentialLinks"
          :key="link.title"
          class="text-grey-4"
          v-bind="link"
        />

        <q-item
          v-if="$q.platform.is.electron"
          class="text-gray-4 absolute-bottom"
          clickable
          @click="showConfirmToQuit = true"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-dialog
      v-model="showConfirmToQuit"
      persistent
    >
      <q-card style="width: 300px">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Really quit Universal Task Manager?</span>
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
            label="Quit"
            color="red"
            @click="quitApp"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavLink from 'components/NavLink';
import { mapState, mapActions } from 'vuex';
import electron from 'electron';

export default {
  name: 'MainLayout',

  components: {
    NavLink,
  },

  data() {
    return {
      leftDrawerOpen: false,
      showConfirmToQuit: false,
      essentialLinks: [
        {
          title: 'Todo',
          icon: 'list',
          to: '/',
        },
        {
          title: 'Settings',
          icon: 'settings',
          to: '/settings',
        },
      ],
    };
  },

  computed: {
    ...mapState('auth', [
      'loggedIn',
    ]),
  },

  methods: {
    ...mapActions('auth', ['logoutUser']),
    quitApp() {
      if (this.$q.platform.is.electron) {
        electron.ipcRenderer.send('quit-app');
      }
    },
  },
};
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
  }
  .q-drawer {
    .q-router-link--exact-active {
      color: white!important;
    }
  }
  .platform-ios {
    .q-header {
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    }
    .q-footer {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom)
    }
  }
</style>
