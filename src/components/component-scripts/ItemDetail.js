export default{
    props: { 
        itemId: Number,
        foodName: String
    },
    data(){
        return{
            data_ready: false,
            item_data: [],
            quantity: 0
        };
    },
    methods: {
        // this function takes the actual quantity and values of item so that it can be passed by reference
        updateCartCounter(){
            this.$store.commit('insertToCart', {foodName: this.foodName, itemId: this.itemId, quantity: this.quantity});
            this.quantity = 0; // reset counter to 0 for UX functionality
            console.log(`item id looked at is: ${this.itemId}`);
            console.log(`food name: ${this.foodName}`);
        },  

         async getData() {
             // leaving this commented in as example for fetch api call
            // try {
            //     // Calls the items API on this server
            //     const BASE_URL = process.env.VUE_APP_APIBASEURL;
            //     let response = await fetch(BASE_URL + "/item", {mode:'no-cors'});
            //     let response_data = await response.json();
            //     // itemId is an index
            //     // If the index doesn't exist dont update the data
            //     if(this.itemId < response_data.length) {
            //         this.item_data = response_data[this.itemId];
            //         this.data_ready = true;
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        },
    },
    created() {
        this.getData();
    },
};




