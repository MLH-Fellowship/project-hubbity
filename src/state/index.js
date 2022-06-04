import { createStore } from 'vuex';

import * as username from './username';
import * as password from './password';

const store = createStore({
  state() {
    return {
      username: username.initialValue,
      password: password.initialValue,
    };
  },
  mutations: {
    ...username.mutations,
    ...password.mutations,
  },
});

export default store;
