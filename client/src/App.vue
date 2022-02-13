<template>
  <section>
    <div class="container">
      <h2>Pick your Poison</h2>
      <div class="row d-flex">
        <div class="col-6">
          <item-detail></item-detail>
        </div>
        <div class="col-6">
          <item-detail></item-detail>
        </div>

      </div>
     
      
    </div>
    
    
    
  </section>
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
  @import'~bootstrap/dist/css/bootstrap.css'
</style>