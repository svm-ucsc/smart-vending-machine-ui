<template>
  <div class="container-fluid app_container">
    <div class="row p-0">
      <search-bar />
    </div>

    <div class="row_box">
        <div class="row menu_box">
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

        <div class="row menu_box">
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

        <div class="row menu_box">
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
  </div>
</template>

<style lang="scss">
  @import'~bootstrap/dist/css/bootstrap.css';
  @import'../src/styles/_variables.scss';

  .app_container{
    background: $summer-yellow;
    height: 100%;
    width: 100%;

    .row_box{
      overflow-y: scroll;
      height: 825px;
    }

    .menu_box{
      overflow-x: scroll;
      flex-wrap: nowrap;
      padding: 5% 0;
    }

    .item_box{
      padding: 0 4%; 
      margin-right: -1%;
      display: inline-block;
      float: none;
    }    
  }
  .app_title{
    font-size: 45px;
  }

  .row{
    padding: 20px 0;
  }

</style>