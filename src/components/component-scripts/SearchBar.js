import $ from 'jquery'
import SimpleKeyboard from "../SimpleKeyboard.vue";
const axios = require('axios');
export default{
    components:{
        SimpleKeyboard
    },
    data(){
        return {
            searchQuery: '',
            items: [],
            // TEMPORARY ITEM TEST CODE
            // items: [{"item_id":"1", "name":"Doritos"},{"item_id":"2", "name":"Lays"},{"item_id":"3", "name":"Red Vines"},
            //     {"item_id":"4", "name":"M&M's"},{"item_id":"5", "name":"Reeses"},{"item_id":"6", "name":"Twix"},
            //     {"item_id":"7", "name":"Sun Chips"},{"item_id":"8", "name":"Ruffles"},{"item_id":"9", "name":"Crunch"}],

            showResults: false,
            showKeyboard: false,
            visible: false,
            layout: "normal",
            input: "",
            foundCount: 0,
            options: {
                useKbEvents: false,
                preventClickEvent: false
            }
        };
    },
    
    computed: {
        filteredItems: function(){
            return this.items.filter((item) => {
                if( item.name.toLowerCase().match(this.searchQuery) != "null" ){
                    this.foundCount = this.foundCount + 1;
                }
                return item.name.toLowerCase().match(this.searchQuery);
            });
        }
    },
    async mounted(){
        const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item');
        this.items = response.data;
        console.log(this.items);
    },
    methods: {
        showSearchInterface(){
            this.showKeyboard = true;
            const bar = document.getElementById('searchBar');
            const btn = document.getElementById('closeBtn');
            $(bar).css('width', '90%');
            $(btn).css('display', 'inline');
        },
        hideSearchInterface(){
            this.showKeyboard = false;
            const bar = document.getElementById('searchBar');
            const btn = document.getElementById('closeBtn');
            this.searchQuery = "";
            $(bar).css('width', '95%');
            $(btn).css('display', 'none');
        },
        showSearchResults(){
            const query = document.getElementById('SearchBar_resultsbox');
            const entry = document.getElementById('list_entry');
            $(query).css('visibility', 'visible');
            $(entry).css('visibility', 'visible');
            this.showResults = true;
        },
        accept(text) {
            alert("Input text: " + text);
            this.hide();
        },

        show(e) {
            this.searchQuery = e.target;
            this.layout = e.target.dataset.layout;

            if (!this.visible)
                this.visible = true
        },

        hide() {
            this.visible = false;
        },
        onChange(searchQuery) {
            this.searchQuery = searchQuery;
        },
        onKeyPress(button) {
            console.log("button", button);
        },
        onInputChange(searchQuery) {
            this.searchQuery = searchQuery.target.value;
        },
        close(){
            this.searchQuery = '';
            this.showKeyboard = false;
        },

    }
};