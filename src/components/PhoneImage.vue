<template>
  <div class="phone-image">
    <img :src="getImagePath"
         alt="phone image"
         class="phone-image"
         loading="lazy"
         >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PhoneImage',
  props: {
    imageId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getImagePath() {
      return this.imageId
        // eslint-disable-next-line
        ? require(`@/assets/product_${this.imageId}_main.webp`)
        // eslint-disable-next-line global-require
        : require('@/assets/no_picture_available.png');
    },
  },
});
</script>

<style lang="scss" scoped>
  .phone {
    &-image {
      height: 200px;
    }
  }
</style>
