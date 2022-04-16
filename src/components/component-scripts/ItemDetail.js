export default{
    props: { 
        itemId: String,
        foodName: String,
        imageUrl: String,
        nutritionalInfoUrl: String,
        itemCost: Number,
        price: String
    },
    data(){
        return{
            data_ready: false,
            item_data: [],
            quantity: 0
        };
    },
    methods: {
        updateCartCounter(){
            this.$store.commit('insertToCart', 
                {foodName: this.foodName, 
                    itemId: this.itemId, 
                    quantity: this.quantity, 
                    itemCost: this.itemCost});
            this.quantity = 0; // reset counter to 0 for UX functionality
        },  

        async getData() {

        },

        getItemID(){
            return this.itemId;
        },
        getModalID(){
            const sym = "#"
            const modalID = sym.concat(this.itemId);
            return modalID;
        },
        getImageURL(){
            return (this.imageUrl != null) ? "https://via.placeholder.com/100?text=Image" : "https://via.placeholder.com/100";
            // return (this.imageUrl != null) ? this.imageUrl : "https://via.placeholder.com/100";
        },
        getNutritionalInfoURL(){
            return (this.nutritionalInfoUrl != null) ? this.nutritionalInfoUrl : "https://via.placeholder.com/100";
        },
        formatCost(){
            let temp = (this.itemCost)/100;
            return temp.toLocaleString("en-US", {style:"currency", currency:"USD"});
        }
    },
    created() {
        // this.price = this.itemCost.toLocaleString("en-US", {style:"currency", currency:"USD"});
        this.getData();
    },
};




