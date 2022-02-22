<template>
  <div>
    <div class="container-fluid app_container p-0">
        <searchbar/>
    </div>
    <div class="container-fluid app_container "> 
      <div class="row d-flex">
        <div class="col-6">
          <!---- itemId is a hacky way of doing this ---->
          <!---- rn each item gets all items and picks one ---->
          <!---- Probably need a containing component to hold the items ---->
          <item-detail :itemId="0"/>
        </div>
        <div class="col-6">
          <item-detail :itemId="1"/>
        </div>
      </div>

      <div class="row d-flex">
        <div class="col-6">
          <item-detail :itemId="0"/>
        </div>
        <div class="col-6">
          <item-detail :itemId="1"/>
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
  }
  .app_title{
    font-size: 45px;
  }

  .row{
    padding: 20px 0;
  }
</style>