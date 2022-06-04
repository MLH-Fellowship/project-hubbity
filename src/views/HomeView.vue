<script>
export default {
  methods: {
    updateUsername(e) {
      this.$store.commit('updateUsername', e.target.value);
    },
    updatePassword(e) {
      this.$store.commit('updatePassword', e.target.value);
    },
  },
};
</script>

<template>
  <div>
    <h1>
      Login
      {{ this.$store.state.username + ' : ' + this.$store.state.password }}
    </h1>
    <form>
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
      <button type="button" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
