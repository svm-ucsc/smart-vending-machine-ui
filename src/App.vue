<template>
  <div class="container-fluid app_container">
    <div class="row p-0">
      <search-bar />
    </div>
    <div>
      <store-menu />
    </div>

    <!-- Shopping Cart Component -->
    <div class="row-order pt-1">
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
  }
  .app_title{
    font-size: 45px;
  }
  .row{
    padding: 20px 0;
  }
   .row-order{
    padding: 0 0 10px 0;
    margin-top: 2%;
  }
</style>