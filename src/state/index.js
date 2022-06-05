import { createStore } from 'vuex';

import * as username from './username';
import * as password from './password';
import * as token from './token';
import * as campaigns from './campaigns';
import newCampaign from './new-campaign';

const store = createStore({
  state() {
    return {
      username: username.initialValue,
      password: password.initialValue,
      token: token.initialValue,
      campaigns: campaigns.initialValue,
      title: newCampaign.initialValue.title,
      description: newCampaign.initialValue.description,
    };
  },
  mutations: {
    ...username.mutations,
    ...password.mutations,
    ...token.mutations,
    ...campaigns.mutations,
    ...newCampaign.mutations,
  },
});

export default store;
