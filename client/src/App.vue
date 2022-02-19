<template>
    <div class="container-fluid app_container">
      <!-- <h2 class="app_title text-center">Welcome to Mr. E's Vending Machine</h2> -->
      <div class="row d-flex">
        <search-bar/>
      </div>
      <div class="row d-flex">
        <div class="col-4">
          <!---- itemId is a hacky way of doing this ---->
          <!---- rn each item gets all items and picks one ---->
          <!---- Probably need a containing component to hold the items ---->
          <!-- <item-detail itemId="0"/> -->
        </div>
        <!-- <div class="col-4">
          <item-detail itemId="1"/>
        </div>
        <div class="col-4">
          <item-detail itemId="2"/>
        </div> -->

      </div>
     
      
    </div>
    
</template>

<style lang="scss">
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