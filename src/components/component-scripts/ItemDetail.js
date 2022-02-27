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
        // updateCart(quantity){
        //     // here I wish to take quantity recorded and send value to cart component
        //     console.log(`the quantity is ${quantity}!`)
        //     this.$store.state.cartQuantity = quantity;
        //     // this.quantity = 0; // might not want to reset it
        // },
        async getData() {
            try {
                // Calls the items API on this server
                const BASE_URL = process.env.VUE_APP_APIBASEURL;
                let response = await fetch(BASE_URL + "/items", {mode:'no-cors'});
                let response_data = await response.json();
                // itemId is an index
                // If the index doesn't exist dont update the data
                if(this.itemId < response_data.length) {
                    this.item_data = response_data[this.itemId];
                    this.data_ready = true;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getData();
    },
};




