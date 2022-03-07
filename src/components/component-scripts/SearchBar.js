import $ from 'jquery'
const axios = require('axios');
export default{
    data(){
        return {
            searchQuery: '',
            items: [],
            showResults: false
        };
    },

    computed: {
        filteredItems: function(){
            return this.items.filter((item) => {
                return item.name.toLowerCase().match(this.searchQuery)
            });
            
        }
    },
    async mounted(){
        const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item');
        this.items = response.data;
        console.log(this.items);
    },

    async getData(){
        console.log(this.searchQuery)
    },

    methods: {
        showSearchResults(){
            const query = document.getElementById('SearchBar_results');
            const entry = document.getElementById('list_entry');
            $(query).css('visibility', 'visible');
            $(entry).css('visibility', 'visible');
            this.showResults = true;
        },
    }


}