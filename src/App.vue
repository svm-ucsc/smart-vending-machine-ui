<template>
  <div class="container-fluid app_container">
    <search-bar />
    <div class="row p-0 m-0">
      <store-menu />
    </div>

    <!-- Shopping Cart Component -->
    <div class="row px-auto mx-auto">
      <cart-items id="show-cart" />
    </div>
  </div>
</template>

<style lang="scss">
  @import'~bootstrap/dist/css/bootstrap.css';
  @import'../src/styles/_variables.scss';
  .app_container{
    background: $summer-yellow;
    height: 100%;
    width: 100%;
    scrollbar-width: 5px;
    padding: 0 0;
  }
  .app_title{
    font-size: 45px;
  }
</style>