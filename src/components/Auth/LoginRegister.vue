<template>
  <q-form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template #avatar>
          <q-icon
            name="account_circle"
            color="secondary"
          />
        </template>
        {{ tab | titleCase }} to access your Todos anywhere
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address']"
        lazy-rules
        outlined
        class="col"
        label="Email"
        stack-label
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']"
        lazy-rules
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
        type="submit"
        color="primary"
        :label="tab"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginRegister',
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  props: {
    tab: {
      type: String,
      default: 'login',
      validator(value) {
        return ['login', 'register'].includes(value);
      },
    },
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions('auth', [
      'registerUser',
    ]),

    /**
     * Is valid email
     * (source -> see link below, +include upper case until @)
     * @link https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression#answer-201378
     * @param field
     * @returns {boolean}
     */
    isValidEmailAddress(field) {
      if (field) {
        // eslint-disable-next-line no-control-regex
        return /^(?:[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z](?:[a-z]*[a-z])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(`${field}`);
      }
      return true;
    },

    submitForm() {
      if (this.tab === 'login') {
        console.log('login');
      } else {
        this.registerUser(this.formData);
      }
    },
  },
};
</script>

<style scoped>

</style>
