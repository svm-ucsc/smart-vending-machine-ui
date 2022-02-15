export default{
    props: {
        itemId: Number
    },
    data(){
        return{
            data_ready: false,
            item_data: [],
            detailsAreVisible: false,
        };
    },
    methods: {
        toggleDetails(){
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        async getData() {
            try {
                // Calls the items API on this server
                let response = await fetch("../items");
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