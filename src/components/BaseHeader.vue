<template>
  <header>
    <img class="logo" :src="require('@/assets/kpn-logo.png')" alt="kpn logo">
  </header>
</template>

<style lang="scss" scoped>
@import "../styles/colors";
  header {
    background-color: $color-green;
    height: 80px;
    margin-bottom: 16px;
    display: grid;
    flex-direction: column;
    align-content: center;
    border-radius: 0 0 8px 8px;

    .logo {
      padding: 16px;
    }
  }
</style>
