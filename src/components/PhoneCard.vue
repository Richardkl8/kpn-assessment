<template>
  <div class="phone-card">
    <h3 class="phone-name">{{ phone.name }}</h3>
    <PhoneImage :image-alt="getPhoneVariant?.name"
                :image-id="getPhoneVariant?.id"/>

    <p>{{phone.variants[0].attributes.promotion_label}}</p>

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
import PhoneImage from '@/components/PhoneImage.vue';
import { PhoneVariant, Phone } from '@/services/PhoneService';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'CardPhone',
  components: { PhoneImage },
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
  },
  methods: {
    setPhoneColor(color: string): void {
      this.selectedColor = color;
    },
    isColorSelected(color: string): boolean {
      return this.selectedColor === color;
    },
    setDefaultColor() {
      this.selectedColor = this.filters.color ? this.filters.color : this.phone.colors[0];
    },
  },
  mounted() {
    this.setDefaultColor();
  },
});
</script>

<style lang="scss" scoped>
.phone {
  &-card {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
  }

  &-color-list {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 16px 0 0 0;

    li {
      padding: 0 10px;
      &:hover {
        cursor: pointer;
      }
    }

    &-item-active {
      color: red;
    }
  }
}
</style>
