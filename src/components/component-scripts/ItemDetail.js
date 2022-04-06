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
        getItemID(){
            return this.itemId;
        },
        getModalID(){
            const item = this.itemId;
            const sym = "#"
            const modalID = sym.concat(item);
            return modalID;
        },
        getNutritionalInfoURL(){
            if(this.nutritionalInfoUrl != null){
                return this.nutritionalInfoUrl;
            }
            else{
                return "https://via.placeholder.com/100";
            }
        }
    },
    created() {
        this.getData();
    },
};




