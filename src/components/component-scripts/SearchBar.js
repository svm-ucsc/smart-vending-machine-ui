import $ from 'jquery'
const axios = require('axios');
export default{
    props: { 
        itemId: String,
        foodName: String
    },
    data(){
        return {
            searchQuery: '',
            items: [],
            showResults: false,
            input: "",
            data_ready: false,
            item_data: [],
            quantity: 0
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
            const query = document.getElementById('SearchBar_resultsbox');
            const entry = document.getElementById('list_entry');
            $(query).css('visibility', 'visible');
            $(entry).css('visibility', 'visible');
            this.showResults = true;
        },
        updateCartCounter(){
            this.$store.commit('insertToCart', {foodName: this.foodName, itemId: this.itemId, quantity: this.quantity});
            this.quantity = 0; // reset counter to 0 for UX functionality
        }, 
    }
}