<template>
  <q-banner
    dense
    inline-actions
    class="list-header text-white text-center"
  >
    <h2 class="text-bold text-subtitle1 q-my-sm">
      <slot />
    </h2>
  </q-banner>
</template>

<script>
export default {
  name: 'ListHeader',
};
</script>

<style scoped>
 .list-header {
   border-top-left-radius: 5px;
   border-top-right-radius: 5px;
 }
</style>
