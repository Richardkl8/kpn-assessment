<template>
  <div class="phone-card" data-cy="phone-card">
    <h3 class="phone-name">{{ phone.name }}</h3>
    <ProductImage :image-alt="getPhoneVariant?.name"
                  :image-path="getImagePath(getPhoneVariant?.id)"
    />

    <p class="phone-promotion" v-show="getPromotionLabel">{{getPromotionLabel}}</p>

    <ul class="phone-color-list">
      <li v-for="color in phone.colors" :key="color"
          @click="setPhoneColor(color)"
          :class="{ 'phone-color-list-item-active': isColorSelected(color) }">
        <h5>
          {{ color }}
        </h5>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductImage from '@/components/ProductImage.vue';
import { PhoneVariant, Phone } from '@/services/PhoneService';
import { mapState } from 'vuex';
import { getImagePath } from '@/utils/utils';

export default defineComponent({
  name: 'PhoneCard',
  components: { ProductImage },
  watch: {
    // eslint-disable-next-line func-names
    'filters.color': function (value) {
      if (value) {
        this.selectedColor = value;
      } else {
        const [defaultColor] = this.phone.colors;
        this.selectedColor = defaultColor;
      }
    },
  },
  data() {
    return {
      selectedColor: this.phone.colors[0],
    };
  },
  props: {
    phone: {
      type: Object as () => Phone,
      required: true,
    },
  },
  computed: {
    ...mapState(['filters']),
    getPhoneVariant(): PhoneVariant | undefined {
      return this.phone.variants
        .find((variant: PhoneVariant) => variant.attributes.color === this.selectedColor);
    },
    getPromotionLabel(): string | null {
      return this.phone.variants[0].attributes.promotion_label;
    },
  },
  methods: {
    setPhoneColor(color: string): void {
      this.selectedColor = color;
    },
    isColorSelected(color: string): boolean {
      return this.selectedColor === color;
    },
    getImagePath,
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/colors";

.phone {
  &-card {
    background: $color-white;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 374px
  }

  &-promotion {
    background-color: $color-green;
    padding: 8px;
    border-radius: 32px;
    color: $color-white;
    font-weight: bold;
    margin-top: 16px;
    font-size: 14px;
  }

  &-color-list {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;

    li {
      padding: 0 8px;
      &:hover {
        cursor: pointer;
      }
    }

    &-item-active {
      color: $color-green;
    }
  }
}

@media screen and (max-width: 767px) {
  .phone-card{
    min-width: 0;
  }
}
</style>
