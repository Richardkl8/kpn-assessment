import { SortingPreference, Manufacturer, PhoneColor } from '@/enums/enums';

export default {
  sortingPreference: [
    { text: 'Meest verkocht', value: SortingPreference.MOST_SOLD },
    { text: 'Datum', value: SortingPreference.DATE },
    { text: 'Actie', value: SortingPreference.PROMOTION },
  ],
  manufacturer: [
    { text: 'Apple', value: Manufacturer.APPLE },
    { text: 'Oppo', value: Manufacturer.OPPO },
    { text: 'Motorola', value: Manufacturer.MOTOROLA },
    { text: 'Samsung', value: Manufacturer.SAMSUNG },
  ],
  colors: [
    { text: 'Wit', value: PhoneColor.WHITE },
    { text: 'Zwart', value: PhoneColor.BLACK },
    { text: 'Grijs', value: PhoneColor.GREY },
  ],
  boolean: [
    { text: 'Ja', value: true },
    { text: 'Nee', value: false },
  ],
};
