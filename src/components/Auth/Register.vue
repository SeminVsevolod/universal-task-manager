<template>
  <q-form>
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template #avatar>
          <q-icon
            name="account_circle"
            color="secondary"
          />
        </template>
        Register to access your Todos anywhere
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        outlined
        class="col"
        label="Email"
        stack-label
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        outlined
        class="col"
        type="password"
        label="Password"
        stack-label
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn
        color="primary"
        label="Register"
      />
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
};
</script>

<style scoped>

</style>
