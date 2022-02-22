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
        
    }
};