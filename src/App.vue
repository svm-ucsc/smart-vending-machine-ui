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
    mounted() {
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
                    {"item_id": "empty", "latitude": coordinates.latitude, "longitude":coordinates.longitude, "range": 10000}
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

    <!-- async showMap(){
            let loc_obj  = 0
            let  response = 0
            let id = this.checkItemName()
            try{
                response = await axios.post('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/location/',
                    {"item_id": id, "latitude":37.0003434, "longitude":-122.0632395, "range": 10000}
                )
                loc_obj = response.data
            }catch(e){
                console.log("Error SearchBar.js")
            }
            this.locations = loc_obj
            this.loc_num = loc_obj.length
            this.inStock = (loc_obj.length <= 0) ? false : true
            this.openMap = true;          
        }, -->


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