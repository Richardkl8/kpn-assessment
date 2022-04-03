import { createStore } from 'vuex';
import { SortingPreference } from '@/enums/enums';
import { State } from '@/store/store';

export const state: State = {
  phones: [],
  phoneOrder: SortingPreference.MOST_SOLD,
  filters: {
    manufacturer: null,
    color: null,
    has5g: null,
  },
};

export const mutations = {
  SET_PHONES: jest.fn(),
  SET_PHONE_ORDER: jest.fn(),
  SET_FILTER_MANUFACTURER: jest.fn(),
  SET_FILTER_COLOR: jest.fn(),
  SET_FILTER_HAS5G: jest.fn(),
};

export const actions = {
  getPhones: jest.fn(),
};

export const getters = {};

export function createMockedStore(
  custom = {
    state: {},
    getters: {},
    actions: {},
    mutations: {},
  },
): any {
  const mockedState = { ...state, ...custom.state };
  const mockedGetters = { ...getters, ...custom.getters };
  const mockedMutations = { ...mutations, ...custom.mutations };
  const mockedActions = { ...actions, ...custom.actions };

  return {
    store: createStore({
      state: mockedState,
      getters: mockedGetters,
      mutations: mockedMutations,
      actions: mockedActions,
    }),
  };
}

export const { store } = createMockedStore();
