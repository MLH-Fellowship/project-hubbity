export const initialValue = [
  {
    id: 0,
    title: 'Campaign 1',
    description:
      'Ullamco laborum ex Lorem adipisicing ullamco cupidatat elit sint voluptate nisi laborum.',
    votes: 1,
    supported: true,
    processing: false,
  },
  {
    id: 1,
    title: 'Campaign 2',
    description:
      'Ullamco laborum ex Lorem adipisicing ullamco cupidatat elit sint voluptate nisi laborum.',
    votes: 0,
    supported: false,
    processing: false,
  },
  {
    id: 2,
    title: 'Campaign 3',
    description:
      'Ullamco laborum ex Lorem adipisicing ullamco cupidatat elit sint voluptate nisi laborum.',
    votes: 6,
    supported: false,
    processing: false,
  },
  {
    id: 3,
    title: 'Campaign 4',
    description:
      'Ullamco laborum ex Lorem adipisicing ullamco cupidatat elit sint voluptate nisi laborum.',
    votes: 3,
    supported: true,
    processing: false,
  },
];

export const mutations = {
  updateCampaigns(state, newCampaigns) {
    state.campaigns = newCampaigns;
  },
};
