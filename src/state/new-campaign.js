export default {
  initialValue: {
    title: '',
    description: '',
  },
  mutations: {
    updateTitle(state, newTitle) {
      state.title = newTitle;
    },
    updateDescription(state, newDescription) {
      state.description = newDescription;
    },
  },
};
