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

<script>
// INCLUDE THIS WHEN MAKING AN API CALL
// import axios from 'axios';
// API call for name finding will happen here
export default{
  data(){
    return{
      // this will eventually be turned into an API call. I can change this to MOD 3 for 3 elements per row or something like that.
      foodNames: [["Cheetos", "Takis", "Chips"], [ "Cadbury", "Sandwich", "Hersheys"], [ "Burgers", "Pizza", "Mojitos"]]
        
    }
  }
}
</script>

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