<template>
  <div v-show="!showFilters" @click="toggleVisibilityFilters()" class="minimized-phone-filters">
    <h3>Toon filters</h3>
  </div>

  <div class="phone-filters" :class="{'phone-filters-show': showFilters}">
    <button @click="toggleVisibilityFilters" class="phone-filters-close-btn">X</button>
    <BaseRadioButtonGroup
      title="Sorteren"
      :value="phoneOrder"
      @change="SET_PHONE_ORDER($event.target.value)"
      :options="filterOptions.sortingPreference"/>

    <BaseCheckboxGroup
      title="Merk"
      :value="filters.manufacturer"
      @selectedCheckbox="setManufacturer"
      :options="filterOptions.manufacturer"/>

    <BaseCheckboxGroup
      title="Kleur"
      :value="filters.color"
      @selectedCheckbox="setColor"
      :options="filterOptions.colors"/>

    <BaseCheckboxGroup
      title="5g"
      :value="filters.has5g"
      @selectedCheckbox="set5g"
      :options="filterOptions.boolean"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import filterOptions from '@/utils/filterOptions';
import BaseRadioButtonGroup from '@/components/BaseRadioButtonGroup.vue';
import BaseCheckboxGroup from '@/components/BaseCheckboxGroup.vue';
import { mapMutations, mapState } from 'vuex';
import { Manufacturer, PhoneColor } from '@/enums/enums';

export default defineComponent({
  name: 'PhoneFilters',
  components: {
    BaseRadioButtonGroup,
    BaseCheckboxGroup,
  },
  data() {
    return {
      filterOptions,
      showFilters: false,
    };
  },
  methods: {
    ...mapMutations([
      'SET_PHONE_ORDER',
      'SET_FILTER_MANUFACTURER',
      'SET_FILTER_COLOR',
      'SET_FILTER_HAS5G',
    ]),
    setManufacturer(manufacturer: Manufacturer): void {
      this.SET_FILTER_MANUFACTURER(manufacturer);
    },
    setColor(color: PhoneColor): void {
      this.SET_FILTER_COLOR(color);
    },
    set5g(has5g: boolean): void {
      this.SET_FILTER_HAS5G(has5g);
    },
    toggleVisibilityFilters() {
      this.showFilters = !this.showFilters;
    },
  },
  computed: {
    ...mapState([
      'phoneOrder',
      'filters',
    ]),
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/colors";
.phone {
  &-filters {
    background-color: $color-white;
    border-radius: 8px;
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    position: relative;
  }
}
.minimized-phone-filters {
  background-color: $color-purple;
  color: $color-white;
  padding: 8px;
  text-align: center;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
  }
}

.phone-filters-close-btn {
  position: absolute;
  right: 32px;
  top: 10px;
  font-weight: bold;
  font-size: 26px;
  color: $color-black;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
}

@media screen and (max-width: 767px) {
  .phone {
    &-filters {
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 8px;
      display: none;
    }
  }
}

@media screen and (min-width: 767px) {
  .minimized-phone-filters {
    display: none;
  }
  .phone-filters-close-btn {
    display: none;
  }
}

.phone-filters-show {
  display: grid;
}
</style>
