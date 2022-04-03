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
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1a1c1f;
  background-color: #f4f4f4;
}

.content {
  padding: 8px;
}

</style>
