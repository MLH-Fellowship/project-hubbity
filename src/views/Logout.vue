<script setup>
import router from '../router';
import store from '../state';
</script>

<script>
export default {
  watch: {
    '$store.state.token': {
      immediate: true,
      async handler() {
        if (store.state.token) {
          store.commit('removeToken');
        }
        router.replace('/');
      },
    },
  },
};
</script>

<template>
  <div class="text-center">
    <h3><em>Logging out...</em></h3>
  </div>
</template>
