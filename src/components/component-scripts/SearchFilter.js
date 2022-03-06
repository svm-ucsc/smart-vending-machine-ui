const axios = require('axios');
export default{
    data(){
        return {
            searchQuery: '',
            items: []
        };
    },

    computed: {
        filteredItems(){

        }
    },
    async mounted(){
        const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item');
        this.items = response.data;
        console.log(this.items);
    }
}