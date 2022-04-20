import $ from 'jquery'
import SimpleKeyboard from "../SimpleKeyboard.vue";
const axios = require('axios');
export default{
    props: { 
        itemId: String,
        foodName: String,
        imageUrl: String,
        nutritionalInfoURL: String,
        itemCost: Number
    },
    components:{
        SimpleKeyboard
    },
    data(){
        return {
            searchQuery: '',
            items: [],
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
                return item.name.toLowerCase().match(this.searchQuery.toLowerCase());
            });
        }
    },
    async mounted(){
        const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item');
        this.items = response.data;
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
        onKeyPress() {
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