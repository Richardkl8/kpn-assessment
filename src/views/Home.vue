<template>
  <div class="container">
    <div class="home">
      <PhoneCard v-for="phone in getFilteredPhones"
                 :key="phone.id"
                 :phone="phone"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import PhoneCard from '@/components/PhoneCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    PhoneCard,
  },
  methods: {
    ...mapActions(['getPhones']),
  },
  computed: {
    ...mapState(['phones']),
    ...mapGetters(['getFilteredPhones']),
  },
  async created(): Promise<void> {
    await this.getPhones();
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  justify-content: center;
}

.home {
  display: grid;
  max-width: 1200px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  padding: 8px;
}

@media screen and (max-width: 767px) {
  .home {
    grid-template-columns: 1fr;
  }

  .container {
    display: block;
  }
}
</style>
