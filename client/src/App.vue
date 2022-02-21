<template>
  <div>

    <div class="input-group input-group-lg">
            <searchbar/>
    </div>

    <div class="container-fluid app_container"> 
      <div class="row d-flex">
        <div class="col-4">
          <!---- itemId is a hacky way of doing this ---->
          <!---- rn each item gets all items and picks one ---->
          <!---- Probably need a containing component to hold the items ---->
          <item-detail itemId="0"/>
        </div>
        <div class="col-4">
          <item-detail itemId="1"/>
        </div>
        <div class="col-4">
          <item-detail itemId="2"/>
        </div>
      </div>
    </div>
  
  </div>
    
</template>

<style>
  @import'~bootstrap/dist/css/bootstrap.css';

  .app_container{
    background: rgb(237,247,247);
    height: 100%;
    width: 100%;
  }
  .app_title{
    font-size: 45px;
  }
</style>