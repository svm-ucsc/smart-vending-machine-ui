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
            // TODO
        },
    },
    created() {
        this.getData();
    },
};




