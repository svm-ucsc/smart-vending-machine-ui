<template>
  <div class="container-fluid app_container">
    <search-bar />
    <div class="row p-0 m-0">
      <store-menu />
    </div>

    <!-- Shopping Cart Component -->
    <div class="row p-0 mx-auto">
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
        
<<<<<<< HEAD
      } catch (e) {
        console.log("Error");
        console.log(e.response.data);
=======
>>>>>>> main
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
    padding: 0 0;
  }
  .app_title{
    font-size: 45px;
  }
</style>