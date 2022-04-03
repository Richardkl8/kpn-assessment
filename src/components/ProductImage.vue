<template>
  <div class="product-image">
    <img :src="imagePath"
         :alt="imageAlt"
         class="product-image"
         loading="lazy"
         >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductImage',
  props: {
    imagePath: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: 'telefoon',
    },
  },
});
</script>

<style lang="scss" scoped>
  .product {
    &-image {
      height: 200px;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
