<script setup>
import axios from 'axios';
import router from '../router';
import store from '../state';
</script>

<script>
export default {
  watch: {
    '$store.state.token': {
      immediate: true,
      async handler() {
        if (!store.state.token) {
          router.replace('/');
        }
      },
    },
  },
  methods: {
    updateTitle(e) {
      store.commit('updateTitle', e?.target?.value ?? e);
    },
    updateDescription(e) {
      store.commit('updateDescription', e?.target?.value ?? e);
    },
    toggleButton(state) {
      this.$refs.createButton.disabled = !state;
    },
    enableButton() {
      this.toggleButton(true);
    },
    disableButton() {
      this.toggleButton(false);
    },
    async create() {
      this.disableButton();
      if (!this.$refs.form.checkValidity()) {
        this.enableButton();
        return this.$refs.form.reportValidity();
      }

      try {
        const { data } = await axios.post(
          '/api/campaigns',
          {
            title: store.state.title,
            description: store.state.description,
          },
          {
            headers: {
              Authorization: `Bearer ${store.state.token}`,
            },
          }
        );
        alert(data);
        this.updateTitle('');
        this.updateDescription('');
      } catch (e) {
        console.error(e);
        e?.response?.data && alert(e.response.data);
      }
      this.enableButton();
    },
  },
};
</script>

<template>
  <div v-if="store.state.token">
    <h1>Create</h1>
    <form ref="form">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          :value="store.state.title"
          @input="updateTitle"
          type="text"
          class="form-control"
          id="title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          :value="store.state.description"
          @input="updateDescription"
          class="form-control"
          id="description"
          required
        ></textarea>
      </div>
      <button
        ref="createButton"
        v-on:click="create"
        type="button"
        class="btn col-lg-4 offset-lg-4 btn-secondary"
      >
        Create
      </button>
    </form>
  </div>
</template>
