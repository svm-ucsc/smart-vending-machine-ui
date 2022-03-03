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

        async getData() {
            try {
                // Calls the items API on this server
                const BASE_URL = process.env.VUE_APP_APIBASEURL;
                let response = await fetch(BASE_URL + "/item", {mode:'no-cors'});
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




