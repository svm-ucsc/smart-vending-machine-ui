export default{
    props: { 
        itemId: String,
        foodName: String,
        itemCost: Number
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
            this.$store.commit('insertToCart', {foodName: this.foodName, itemId: this.itemId, quantity: this.quantity, itemCost: this.itemCost});
            this.quantity = 0; // reset counter to 0 for UX functionality
        },  

        async getData() {
            
        },
    },
    created() {
        this.getData();
    },
};




