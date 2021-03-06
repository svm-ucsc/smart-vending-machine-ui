
export default{
    props: { 
        itemId: String,
        foodName: String,
        itemCost: Number,
        imageUrl: String,
        nutritionalInfoUrl: String
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

        async getData() {},
        
        getItemID(){
            return this.itemId;
        },
        getModalID(){
            const sym = "#"
            const modalID = sym.concat(this.itemId);
            return modalID;
        },
        getImageURL(){
            return (this.imageUrl != null) ? this.imageUrl : "https://via.placeholder.com/100";
        },
        getNutritionalInfoURL(){
            return (this.nutritionalInfoUrl != null) ? this.nutritionalInfoUrl : "https://via.placeholder.com/100";
        }
    },
    created() {
        this.getData();
    },
    
};



