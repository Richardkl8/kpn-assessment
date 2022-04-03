// eslint-disable-next-line max-len
/* eslint no-shadow: ["error", { "allow": ["state", "SortingPreference", "PhoneColor", "getters", "Manufacturer"] }] */
import { createStore, Commit } from 'vuex';
import { getPhones, Phone } from '@/services/PhoneService';

export enum SortingPreference {
  MOST_SOLD = 'MOST_SOLD',
  DATE = 'DATE',
  PROMOTION = 'PROMOTION',
}

export enum PhoneColor {
  BLACK = 'ZWART',
  WHITE = 'WIT',
  GREY = 'GRIJS',
}

export enum Manufacturer {
  SAMSUNG = 'Samsung',
  OPPO = 'OPPO',
  APPLE = 'Apple',
  MOTOROLA = 'Motorola'
}

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
    has5g: true,
  },
};

export const getters = {
  getSortedPhones(state: State): Phone[] {
    console.log(1);
    let sortedArray = [] as Phone[] | [];
    switch (state.phoneOrder) {
      case SortingPreference.DATE:
        sortedArray = state.phones
          .slice()
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .sort((a, b) => new Date(a.release_date) + new Date(b.release_date));
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
    if (state.filters.has5g) {
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
