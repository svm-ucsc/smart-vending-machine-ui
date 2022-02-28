<template>
  <div class="container-fluid app_container">
    <div class="row p-0">
      <search-bar />
    </div>

    <div> 
      <store-menu />
    </div>

    <!-- Shopping Cart Component -->
    <!-- <div class="row"><button type="button" class="btn review-order-btn mx-auto">REVIEW ORDER</button></div> -->
    <div class="row-order pt-1">
      <cart-items id="show-cart" />
    </div>
  </div>
</template>

<script>
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

   .row-order{
    padding: 0px 0px;
  }

</style>
