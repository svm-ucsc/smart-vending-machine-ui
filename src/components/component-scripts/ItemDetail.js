export default{
    props: { 
        itemId: String,
        foodName: String,
        price: String,
        imageUrl: String,
        nutritionalInfoURL: String
    },
    data(){
        return{
            data_ready: false,
            item_data: [],
            quantity: 0,
            nutritionalInfo: false
        };
    },
    methods: {
        // this function takes the actual quantity and values of item so that it can be passed by reference
        updateCartCounter(){
            this.$store.commit('insertToCart', {foodName: this.foodName, itemId: this.itemId, quantity: this.quantity});
            this.quantity = 0; // reset counter to 0 for UX functionality
        },  

        async getData() {
            
        },

        showNutritionalInfo(){
            this.nutritionalInfo = true;
        },
        getImageURL(){
            if(this.imageUrl != ""){
                return this.imageUrl;
            }
            else{
                const placeholder = "https://via.placeholder.com/100";
                return placeholder;
            }
        },
        getNutritionalInfoURL(){
            if(this.nutritionalInfoURL != ""){
                const placeholder = "https://world.openfoodfacts.org/images/products/002/840/009/0896/nutrition_en.35.full.jpg";
                return placeholder;
                //return this.nutritionalInfoURL;
            }
            else{
                const placeholder = "https://world.openfoodfacts.org/images/products/002/840/009/0896/nutrition_en.35.full.jpg";
                return placeholder;
            }
        }
    },
    created() {
        this.getData();
    },
};




