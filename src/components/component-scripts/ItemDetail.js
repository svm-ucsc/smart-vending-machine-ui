export default{
    props: { 
        itemId: String,
        foodName: String,
<<<<<<< HEAD
        price: String,
        imageUrl: String,
        nutritionalInfoURL: String
=======
        itemCost: Number
>>>>>>> main
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
        updateCartCounter(){
<<<<<<< HEAD
            this.$store.commit('insertToCart', {foodName: this.foodName, itemId: this.itemId, quantity: this.quantity});
            this.quantity = 0;
=======
            this.$store.commit('insertToCart', {foodName: this.foodName, itemId: this.itemId, quantity: this.quantity, itemCost: this.itemCost});
            this.quantity = 0; // reset counter to 0 for UX functionality
>>>>>>> main
        },  

        async getData() {
            
        },

        showNutritionalInfo(){
            this.nutritionalInfo = true;
        },
        getImageURL(){
            if(this.imageUrl != null){
                return this.imageUrl;
            }
            else{
                var placeholder = "https://via.placeholder.com/100";
                return placeholder;
            }
        },
        getNutritionalInfoURL(){
            if(this.nutritionalInfoURL != null){
                const placeholder = "https://world.openfoodfacts.org/images/products/002/840/009/0896/nutrition_en.35.full.jpg";
                return placeholder;
                //return this.nutritionalInfoURL;
            }
            else{
                // const placeholder = "https://world.openfoodfacts.org/images/products/002/840/009/0896/nutrition_en.35.full.jpg";
                // return placeholder;
                return null;
            }
        }
    },
    created() {
        this.getData();
    },
};




