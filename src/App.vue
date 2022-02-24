<template>
  <div class="container-fluid app_container">
    <div class="p-0">
      <search-bar />
    </div>
    <div class="row d-flex">
      <div class="col-6">
        <!---- itemId is a hacky way of doing this ---->
        <!---- rn each item gets all items and picks one ---->
        <item-detail
          :item-id="0"
          food-name="Cheetos"
        />
      </div>
      <div class="col-6">
        <item-detail
          :item-id="1"
          food-name="Takis"
        />
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