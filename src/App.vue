<template>
  <div class="container-fluid app_container">
    <!-- Search Bar Component -->
    <div class="row px-auto mx-auto">
      <search-bar />
    </div>

    <!-- Menu Component -->
    <div class="row p-0 mx-auto">
      <store-menu />
    </div>

    <!-- Shopping Cart Component -->
    <div class="row p-0 m-0">
      <cart-items
        id="show-cart"
        class="p-0 m-0"
      />
    </div>
  </div>
</template>

<script>
export default ({
    mounted() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                const coordinates = {latitude: position.coords.latitude, longitude: position.coords.longitude}
                this.$store.commit('setCoordinates', coordinates); 
                this.$store.commit('setMachineID'); 
            });
        }
    }
})
</script>


<style lang="scss">
  @import'~bootstrap/dist/css/bootstrap.css';
  @import'../src/styles/_variables.scss';
  .app_container{
    background: $summer-white;
    height: 100%;
    width: 100%;
    scrollbar-width: 5px;
    padding: 0 0;
  }
  .app_title{
    font-size: 45px;
  }
</style>