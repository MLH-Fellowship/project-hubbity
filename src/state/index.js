import { createStore } from 'vuex';

import * as username from './username';
import * as password from './password';
import * as token from './token';

const store = createStore({
  state() {
    return {
      username: username.initialValue,
      password: password.initialValue,
      token: token.initialValue,
    };
  },
  mutations: {
    ...username.mutations,
    ...password.mutations,
    ...token.mutations,
  },
});

export default store;
