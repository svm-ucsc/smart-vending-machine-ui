export default{
    props: { 
        itemId: String,
        foodName: String,
        price: String,
        imageUrl: String,
        nutritionalInfoUrl: String
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
            this.$store.commit('insertToCart', {foodName: this.foodName, itemId: this.itemId, quantity: this.quantity});
            this.quantity = 0;
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
            if(this.nutritionalInfoUrl != null){
                console.log(this.nutritionalInfoUrl);
                return this.nutritionalInfoUrl;
            }
            else{
                return null;
            }
        }
    },
    created() {
        this.getData();
    },
};




