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
const axios = require('axios');
export default ({
    created() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                const coordinates = {latitude: position.coords.latitude, longitude: position.coords.longitude}
                this.$store.commit('setCoordinates', coordinates);
                this.getClosestMachine(coordinates)
            });
        }
    },
    methods:{
        async getClosestMachine(coordinates){
            let machineList = []
            try{
                let response = await axios.post('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/location/',
                    {"item_id": "empty", "latitude": coordinates.latitude, "longitude":coordinates.longitude, "range": 100000}
                )
                machineList = response.data
            }catch(e){
                console.log("Error App.vue")
            }
            let closest = machineList[0]
            for(var i = 1; i < machineList.length; i++){
                if(machineList[i].distance < closest.distance){
                    closest = machineList[i]
                }
            }
            this.$store.commit('setClosestMachineID', closest.machine_id ); 
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