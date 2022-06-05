import { createStore } from 'vuex';

import * as username from './username';
import * as password from './password';
import * as token from './token';
import * as campaigns from './campaigns';

const store = createStore({
  state() {
    return {
      username: username.initialValue,
      password: password.initialValue,
      token: token.initialValue,
      campaigns: campaigns.initialValue,
    };
  },
  mutations: {
    ...username.mutations,
    ...password.mutations,
    ...token.mutations,
    ...campaigns.mutations,
  },
});

export default store;
