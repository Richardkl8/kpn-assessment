<template>
  <div class="container">
    <section class="filters">
      <PhoneFilters/>
    </section>

    <section class="phones">
      <PhoneCard v-for="phone in getFilteredPhones"
                 :key="phone.id"
                 :phone="phone"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import PhoneCard from '@/components/PhoneCard.vue';
import PhoneFilters from '@/components/PhoneFilters.vue';

export default defineComponent({
  name: 'Home',
  components: {
    PhoneFilters,
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
  grid-row-gap: 16px;
}

.phones {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  max-width: 1250px;
}

@media screen and (max-width: 1100px) {
  .phones {
    grid-template-columns: 1fr 1fr;
  }

  .container {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 767px) {
  .container, .phones {
    grid-template-columns: 1fr;
  }
}
</style>
