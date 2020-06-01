<template>
  <q-card-section class="row items-center">
    <div class="text-h6">
      <slot />
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
</template>

<script>
export default {
  name: 'ModalHeader',
};
</script>

<style scoped>

</style>
