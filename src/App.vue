<template>
  <div class="container-fluid app_container">
    <search-bar style="width: 100%;" />
    <div class="row p-0">
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
// INCLUDE THIS WHEN MAKING AN API CALL
  const axios = require('axios');
  export default{
    data(){
      return{
        itemIDs: []
      }
    },
    async getItemIDs() {
      try {
        // API call to get item_id
        // equivalent to http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item?fields=item_id
        const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
          { params: { fields: "item_id" } });
        const obj = response.data;
        // loop to push each item_id into itemIDs data field
        for(var i = 0; i < obj.length; i++){
          this.itemIDs.push(obj[i].item_id);
        }
        
      } catch (e) {
        console.log("Error");
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