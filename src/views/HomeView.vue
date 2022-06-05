<script setup>
import axios from 'axios';
import store from '../state';
</script>

<script>
export default {
  watch: {
    '$store.state.token': {
      immediate: true,
      async handler() {
        if (store.state.token) {
          const { data } = await axios.get('/api/campaigns', {
            headers: {
              Authorization: `Bearer ${store.state.token}`,
            },
          });
          store.commit(
            'updateCampaigns',
            data.map((c) => ({
              ...c,
              processing: false,
            }))
          );
        }
      },
    },
  },
  methods: {
    updateUsername(e) {
      store.commit('updateUsername', e?.target?.value ?? e);
    },
    updatePassword(e) {
      store.commit('updatePassword', e?.target?.value ?? e);
    },
    getCredentials() {
      return {
        email: store.state.username,
        password: store.state.password,
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
        store.commit('updateToken', token);
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
    async supportCampaign(id) {
      const campaigns = store.state.campaigns;
      store.commit(
        'updateCampaigns',
        campaigns.map((c) => {
          if (c.id !== id) {
            return c;
          }
          return {
            ...c,
            processing: true,
          };
        })
      );
      const campaign = campaigns.find((c) => c.id === id);
      if (campaign.supported) {
        await axios.delete('/api/campaigns/' + id, {
          headers: {
            Authorization: `Bearer ${store.state.token}`,
          },
        });
      } else {
        await axios.post('/api/campaigns/' + id, undefined, {
          headers: {
            Authorization: `Bearer ${store.state.token}`,
          },
        });
      }
      const { data: updatedCampaign } = await axios.get(
        '/api/campaigns/' + id,
        {
          headers: {
            Authorization: `Bearer ${store.state.token}`,
          },
        }
      );
      store.commit(
        'updateCampaigns',
        campaigns.map((c) => {
          if (c.id !== id) {
            return c;
          }
          return {
            ...updatedCampaign,
            processing: false,
          };
        })
      );
    },
  },
};
</script>

<template>
  <div v-if="!store.state.token">
    <h1>Login / Register</h1>
    <form ref="form">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          :value="store.state.username"
          @input="updateUsername"
          type="email"
          class="form-control"
          id="email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          :value="store.state.password"
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
  <div v-else>
    <h1 class="mb-4">Campaigns</h1>
    <div class="container">
      <div class="row">
        <div
          v-for="campaign in store.state.campaigns"
          class="campaign col-12 col-md-6 col-lg-4"
        >
          <div class="mx-1 mb-2 px-3 py-4">
            <h3>{{ campaign.title }}</h3>
            <p>
              {{ campaign.description }}
            </p>
            <div>Votes: {{ campaign.votes }}</div>
            <div class="mt-2 w-100">
              <button
                @click="() => supportCampaign(campaign.id)"
                :class="{
                  'btn-outline-primary': !campaign.supported,
                  'btn-primary': campaign.supported,
                }"
                class="btn col-12"
                :disabled="campaign.processing"
              >
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.campaign > div {
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
}
</style>
