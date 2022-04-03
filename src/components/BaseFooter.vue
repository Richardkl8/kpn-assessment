<template>
  <footer>
    <img class="logo" :src="require('@/assets/kpn-logo.png')" alt="kpn logo">
  </footer>
</template>

<style lang="scss" scoped>
@import "../styles/colors";
  footer {
    background-color: $color-black;
    height: 100px;
    margin-top: 16px;
    display: grid;
    justify-content: center;
    align-content: center;
  }
</style>
