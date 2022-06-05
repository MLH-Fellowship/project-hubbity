<script setup>
import axios from 'axios';
import store from '../state';
</script>

<script>
export default {
  methods: {
    updateTitle(e) {
      store.commit('updateTitle', e?.target?.value ?? e);
    },
    updateDescription(e) {
      store.commit('updateDescription', e?.target?.value ?? e);
    },
    async create() {},
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
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          :value="store.state.description"
          @input="updateDescription"
          class="form-control"
          id="description"
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
