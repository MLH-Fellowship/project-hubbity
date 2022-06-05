<script setup>
import axios from 'axios';
</script>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.token != null;
    },
    campaigns() {
      return this.$store.state.campaigns;
    },
  },
  async mounted() {
    if (this.isLoggedIn) {
      const { data } = await axios.get('/api/campaigns', {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      });
      this.$store.commit('updateCampaigns', data);
    }
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
    async supportCampaign(id) {
      const campaigns = this.campaigns;
      this.$store.commit(
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
      await new Promise((r) => setTimeout(r, 1000));
      this.$store.commit(
        'updateCampaigns',
        campaigns.map((c) => {
          if (c.id !== id) {
            return c;
          }
          return {
            ...c,
            votes: !c.supported ? c.votes + 1 : c.votes - 1,
            supported: !c.supported,
            processing: false,
          };
        })
      );
    },
  },
};
</script>

<template>
  <div v-if="!this.isLoggedIn">
    <h1>Login / Register</h1>
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
  <div v-else>
    <h1 class="mb-4">Campaigns</h1>
    <div class="container">
      <div class="row">
        <div
          v-for="campaign in this.campaigns"
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
                @click="() => this.supportCampaign(campaign.id)"
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
