<script setup>
import axios from 'axios';
</script>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.token != null;
    },
  },
  methods: {
    updateUsername(e) {
      this.$store.commit('updateUsername', e?.target?.value ?? e);
    },
    updatePassword(e) {
      this.$store.commit('updatePassword', e?.target?.value ?? e);
    },
    getCredentials() {
      return {
        email: this.$store.state.username,
        password: this.$store.state.password,
      };
    },
    toggleButtons(state) {
      this.$refs.loginButton.disabled = !state;
      this.$refs.registerButton.disabled = !state;
    },
    enableButtons() {
      this.toggleButtons(true);
    },
    disableButtons() {
      this.toggleButtons(false);
    },
    async login() {
      this.disableButtons();
      if (!this.$refs.form.checkValidity()) {
        this.enableButtons();
        return this.$refs.form.reportValidity();
      }
      try {
        const { email, password } = this.getCredentials();
        const {
          data: { token },
        } = await axios.post('/api/login', {
          email,
          password,
        });
        this.$store.commit('updateToken', token);
      } catch (e) {
        console.error(e);
        e?.response?.data && alert(e.response.data);
      }
      this.enableButtons();
    },
    async register() {
      this.disableButtons();
      if (!this.$refs.form.checkValidity()) {
        this.enableButtons();
        return this.$refs.form.reportValidity();
      }
      try {
        const { email, password } = this.getCredentials();
        const { data: msg } = await axios.post('/api/register', {
          email,
          password,
        });
        alert(msg);
        this.updateUsername('');
        this.updatePassword('');
      } catch (e) {
        console.error(e);
        e?.response?.data && alert(e.response.data);
      }
      this.enableButtons();
    },
  },
};
</script>

<template>
  <div v-if="!this.isLoggedIn">
    <h1>Login</h1>
    <form ref="form">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          :value="this.$store.state.username"
          @input="updateUsername"
          type="email"
          class="form-control"
          id="email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          :value="this.$store.state.password"
          @input="updatePassword"
          type="password"
          class="form-control"
          id="password"
        />
      </div>
      <button
        ref="loginButton"
        v-on:click="login"
        type="button"
        class="btn btn-success"
      >
        Login</button
      >{{ ' ' }}
      <button
        ref="registerButton"
        v-on:click="register"
        type="button"
        class="btn btn-primary"
      >
        Register
      </button>
    </form>
  </div>
</template>
