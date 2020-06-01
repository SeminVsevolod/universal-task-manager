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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavLink from 'components/NavLink';

export default {
  name: 'MainLayout',

  components: {
    NavLink,
  },

  data() {
    return {
      leftDrawerOpen: false,
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
</style>
