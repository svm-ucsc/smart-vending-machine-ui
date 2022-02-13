<template>
  <section>
      <div class="container ItemDetail_container">
        <h2 class="ItemDetail_name text-center">{{food.name}}</h2>
        <button @click="toggleDetails" type="button" class="btn-info align-items-center">Show Nutritional Info</button>
        <ul v-if="detailsAreVisible">
            <li>{{food.description}}</li>
            <li>{{food.calories}}</li>
        </ul>
      </div>
    
  </section>
</template>


<script>
    export default{
        data(){
            return{
                detailsAreVisible: false,
                food:{
                    name: 'Cheetos',
                    description: 'Crunchy Orange Stick',
                    calories: 100
                }
                // food:{
                //     name: 'Lays Potato Chips',
                //     description: 'Potato Crips',
                //     calories: 200
                // }
            };
        },
        methods: {
            toggleDetails(){
                this.detailsAreVisible = !this.detailsAreVisible;
            }
        }
    };
</script>

<style>
    .ItemDetail_container{
        background: white;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        min-height: 250px;
        .ItemDetail_name{
            color: black;
            
        }
        
    }
    

</style>