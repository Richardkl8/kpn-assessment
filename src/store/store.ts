/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import { createStore, Commit } from 'vuex';
import { getPhones, Phone } from '@/services/PhoneService';

export interface State {
  phones: Phone[];
}

export const state = {
  phones: [],
};

export const mutations = {
  SET_PHONES(state: State, payload: Phone[]): void {
    state.phones = payload;
  },
};

export const actions = {
  async getPhones({ commit }: { commit: Commit}): Promise<void> {
    const data = await getPhones();
    commit('SET_PHONES', data);
  },
};

export default createStore<State>({
  state,
  mutations,
  actions,
});
