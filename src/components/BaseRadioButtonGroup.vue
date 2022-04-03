<template>
  <div class="radio-button-group">
    <h3>{{ title }}</h3>
    <label v-for="option in options" :for="option.text"  :key="option.value">
      <input type="radio" name="radio-input" :value="option.value"
             :id="option.value"
             :checked="option.value === value"
             @change="$emit('update:change')" />
      {{ option.text }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseRadioButtonGroup',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
    },
    title: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.radio-button-group {
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0 0 8px;
}

input[type=radio] {
  transform: scale(1.2);
}

label {
  padding: 4px 0;
}
</style>
