<template>
  <section>
      <div class="container ItemDetail_container">
        <h2 class="ItemDetail_name">{{food.name}}</h2>
        <button @click="toggleDetails" type="button" class="btn">Show Nutritional Info</button>
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
        background: pink;
        .ItemDetail_name{
            color: black;
        }
    }
    

</style>