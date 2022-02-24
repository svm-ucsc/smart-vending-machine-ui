<template>
  <div class="container-fluid app_container">
    <div class="row p-0">
      <search-bar />
    </div>
    <div class="container scroll">
      <div class="row d-flex menu_box">
        <div class="col-6 item_box">
          <item-detail :item-id="1" />
        </div>
        <div class="col-6 item_box">
          <item-detail :item-id="2" />
        </div>
        <div class="col-6 item_box">
          <item-detail :item-id="3" />
        </div>
      </div>
    </div>
    <div class="row d-flex">
      <div class="col-6 item_box">
        <item-detail :item-id="1" />
      </div>
      <div class="col-6 item_box">
        <item-detail :item-id="2" />
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

  .item_box{
    padding: 0 4%; 
    margin-right: -1%;
    display: inline-block;
    float: none;
  }

  .menu_box{
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    
  }


</style>