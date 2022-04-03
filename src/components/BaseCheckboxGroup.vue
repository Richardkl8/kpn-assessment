<template>
  <div class="checkbox-group">
    <h3>{{ title }}</h3>
    <label v-for="option in options" :for="option.text"  :key="option.value">
      <input type="checkbox" name="checkbox" :value="option.value"
             :id="option.value"
             :checked="option.value === value"
             @change="emitValue(option.value)" />
      {{ option.text }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseCheckboxGroup',
  data() {
    return {
      previousValue: '',
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Boolean],
    },
    title: {
      type: String,
    },
  },
  methods: {
    emitValue(value: string): void {
      if (this.previousValue !== value) {
        this.$emit('selectedCheckbox', value);
        this.previousValue = value;
      } else {
        this.$emit('selectedCheckbox', null);
        this.previousValue = '';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0 0 8px;
}

input[type=checkbox] {
  transform: scale(1.2);
}

label {
  padding: 5px 0;
}
</style>
