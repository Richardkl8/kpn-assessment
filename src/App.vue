<template>
  <BaseHeader/>
    <router-view class="content"/>
  <BaseFooter/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseFooter from '@/components/BaseFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    BaseHeader,
    BaseFooter,
  },
});
</script>

<style lang="scss">
@import "styles/colors";
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-black;
  background-color: $color-light-grey;
}

.content {
  padding: 8px;
}

</style>
