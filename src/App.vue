<template>
  <div class="container-fluid app_container">
    <!-- <h2 class="app_title text-center">Welcome to Mr. E's Vending Machine</h2> -->
    <div class="p-0">
      <search-bar />
    </div>
    <div class="row d-flex">
      <div class="col-4">
        <!---- itemId is a hacky way of doing this ---->
        <!---- rn each item gets all items and picks one ---->
        <!---- Probably need a containing component to hold the items ---->
        <item-detail :item-id="1" />
      </div>
    </div>
    <div class="row">
      <!-- cart left half split screen -->
      <div class="col-6">
        <cart-items />
      </div>
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
  }
  .app_title{
    font-size: 45px;
  }

  .row{
    padding: 20px 0;
  }
</style>