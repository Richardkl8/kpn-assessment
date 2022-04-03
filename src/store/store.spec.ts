import {
  actions, getters, Getters, mutations, State,
} from '@/store/store';
import { Manufacturer, PhoneColor, SortingPreference } from '@/enums/enums';
import { Phone } from '@/services/PhoneService';
import { state } from '../../tests/unit/utils';
import mockPhoneResponse from '../../tests/unit/mockPhoneResponse';

jest.mock('@/services/PhoneService', () => ({
  __esModule: true,
  getPhones: () => mockPhoneResponse,
}));

describe('Mutations', () => {
  let mockState: State;
  beforeEach(() => {
    mockState = JSON.parse(JSON.stringify(state));
  });

  it('should set the state of phones when called with payload', () => {
    mutations.SET_PHONES(mockState, mockPhoneResponse);
    expect(mockState.phones).toBe(mockPhoneResponse);
  });

  it('should set the state of phoneOrder when called with payload', () => {
    mutations.SET_PHONE_ORDER(mockState, SortingPreference.DATE);
    expect(mockState.phoneOrder).toBe(SortingPreference.DATE);
  });

  it('should set the state of filter.manufacturer when called with payload', () => {
    mutations.SET_FILTER_MANUFACTURER(mockState, Manufacturer.APPLE);
    expect(mockState.filters.manufacturer).toBe(Manufacturer.APPLE);
  });

  it('should set the state of filter.color when called with payload', () => {
    mutations.SET_FILTER_COLOR(mockState, PhoneColor.GREY);
    expect(mockState.filters.color).toBe(PhoneColor.GREY);
  });

  it('should set the state of filter.has5g when called with payload', () => {
    mutations.SET_FILTER_HAS5G(mockState, false);
    expect(mockState.filters.has5g).toBe(false);
  });
});

describe('Getters', () => {
  let mockState: State;
  beforeEach(() => {
    mockState = JSON.parse(JSON.stringify(state));
  });

  it('should order the phone array based on sort_order (most sold)', () => {
    mockState.phoneOrder = SortingPreference.MOST_SOLD;
    mockState.phones = [
      { sort_order: 2 },
      { sort_order: 1 },
      { sort_order: 3 }] as Phone[];
    const result = getters.getSortedPhones(mockState);
    expect(result).toEqual([
      { sort_order: 1 },
      { sort_order: 2 },
      { sort_order: 3 }]);
  });

  it('should order the phones based on date', () => {
    mockState.phoneOrder = SortingPreference.DATE;
    mockState.phones = [
      { release_date: '2022-03-25' },
      { release_date: '2018-01-05' },
      { release_date: '2021-02-15' }] as Phone[];
    const result = getters.getSortedPhones(mockState);
    expect(result).toEqual([
      { release_date: '2022-03-25' },
      { release_date: '2021-02-15' },
      { release_date: '2018-01-05' },
    ]);
  });

  it('should order the phones array based on promotions', () => {
    mockState.phoneOrder = SortingPreference.PROMOTION;
    mockState.phones = [
      { variants: [{ attributes: { promotion_label: null } }] },
      { variants: [{ attributes: { promotion_label: '10% off' } }] }] as Phone[];
    const result = getters.getSortedPhones(mockState);
    expect(result).toEqual([
      { variants: [{ attributes: { promotion_label: '10% off' } }] },
      { variants: [{ attributes: { promotion_label: null } }] }]);
  });

  it('should filter the phones array based on color', () => {
    mockState.filters.color = PhoneColor.GREY;
    const mockGetters = {
      getSortedPhones: [
        { colors: ['GRIJS'] },
        { colors: ['ZWART'] },
        { colors: ['GRIJS'] },
      ] as Phone[],
      getFilteredPhones: [] as Phone[],
    };
    const result = getters.getFilteredPhones(mockState, mockGetters);
    expect(result).toEqual([
      { colors: ['GRIJS'] },
      { colors: ['GRIJS'] },
    ]);
  });

  it('should filter the phones array based on 5g', () => {
    mockState.filters.has5g = false;
    const mockGetters = {
      getSortedPhones: [
        { has_5g: true },
        { has_5g: true },
        { has_5g: false },
      ] as Phone[],
      getFilteredPhones: [] as Phone[],
    };
    const result = getters.getFilteredPhones(mockState, mockGetters);
    expect(result).toEqual([
      { has_5g: false },
    ]);
  });

  it('should filter the phones array based on manufacturer', () => {
    mockState.filters.manufacturer = Manufacturer.APPLE;
    const mockGetters = {
      getSortedPhones: [
        { manufacturer: 'Apple' },
        { manufacturer: 'Samsung' },
        { manufacturer: 'OPPO' },
      ] as Phone[],
      getFilteredPhones: [] as Phone[],
    };
    const result = getters.getFilteredPhones(mockState, mockGetters);
    expect(result).toEqual([
      { manufacturer: 'Apple' },
    ]);
  });
});

describe('Actions', () => {
  it('should commit the data retrieved from the api when called', async () => {
    const commit = jest.fn();
    await actions.getPhones({ commit });
    expect(commit).toHaveBeenCalledWith('SET_PHONES', mockPhoneResponse);
  });
});
