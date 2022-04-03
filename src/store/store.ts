/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
import { createStore, Commit } from 'vuex';
import { getPhones, Phone } from '@/services/PhoneService';
import { Manufacturer, PhoneColor, SortingPreference } from '@/enums/enums';

export interface State {
  phones: Phone[];
  filters: {
    manufacturer: Manufacturer | null;
    color: PhoneColor | null ;
    has5g: boolean | null,
  };
  phoneOrder: SortingPreference,
}

export interface Getters {
  getSortedPhones: Phone[];
  getFilteredPhones: Phone[];
}

export const state = {
  phones: [],
  phoneOrder: SortingPreference.MOST_SOLD,
  filters: {
    manufacturer: null,
    color: null,
    has5g: null,
  },
};

export const getters = {
  getSortedPhones(state: State): Phone[] {
    let sortedArray = [] as Phone[] | [];
    switch (state.phoneOrder) {
      case SortingPreference.DATE:
        sortedArray = state.phones
          .slice()
          .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        break;
      case SortingPreference.PROMOTION:
        sortedArray = state.phones
          .slice()
          .sort((a) => (a.variants[0].attributes.promotion_label ? -1 : +1));
        break;
      default:
        // Sort the array based on most sold (default state)
        sortedArray = state.phones
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order);
    }
    return sortedArray;
  },
  getFilteredPhones(state: State, getters: Getters): Phone[] {
    let filteredArray = getters.getSortedPhones;

    if (state.filters.color) {
      filteredArray = filteredArray
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .filter((phone) => phone.colors.includes(state.filters.color!));
    }
    if (state.filters.manufacturer) {
      filteredArray = filteredArray
        .filter((phone) => phone.manufacturer === state.filters.manufacturer);
    }
    if (state.filters.has5g !== null) {
      filteredArray = filteredArray
        .filter((phone) => phone.has_5g === state.filters.has5g);
    }
    return filteredArray;
  },
};

export const mutations = {
  SET_PHONES(state: State, payload: Phone[]): void {
    state.phones = payload;
  },
  SET_PHONE_ORDER(state: State, payload: SortingPreference): void {
    state.phoneOrder = payload;
  },
  SET_FILTER_MANUFACTURER(state: State, payload: Manufacturer): void {
    state.filters.manufacturer = payload;
  },
  SET_FILTER_COLOR(state: State, payload: PhoneColor): void {
    state.filters.color = payload;
  },
  SET_FILTER_HAS5G(state: State, payload: boolean): void {
    state.filters.has5g = payload;
  },
};

export const actions = {
  async getPhones({ commit }: { commit: Commit }): Promise<void> {
    const data = await getPhones();
    commit('SET_PHONES', data);
  },
};

export default createStore<State>({
  state,
  mutations,
  actions,
  getters,
});
