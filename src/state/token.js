const TOKEN_ID = 'hubbityToken';

export const initialValue = localStorage.getItem(TOKEN_ID) ?? null;

export const mutations = {
  updateToken(state, newToken) {
    localStorage.setItem(TOKEN_ID, newToken);
    state.token = newToken;
  },
  removeToken(state) {
    localStorage.removeItem(TOKEN_ID);
    state.token = null;
  },
};
