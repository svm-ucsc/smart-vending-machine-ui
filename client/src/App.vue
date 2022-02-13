<template>
    <div class="container-fluid app_container">
      <h2 class="app_title text-center">Welcome to Mr. E's Vending Machine</h2>
      <div class="row d-flex">
        <div class="col-4">
          <item-detail></item-detail>
        </div>
        <div class="col-4">
          <item-detail></item-detail>
        </div>
        <div class="col-4">
          <item-detail></item-detail>
        </div>

      </div>
     
      
    </div>
    
</template>

<script>
  export default {
    data(){
      return{
        food:[
          {
            name: '',
            description: '',
            calories: ''
          }
        ]
          
      };
    }
  }
</script>

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