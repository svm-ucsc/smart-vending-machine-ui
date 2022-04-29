import $ from 'jquery'
import SimpleKeyboard from "../SimpleKeyboard.vue";
import OpenLayersMap from "../OpenLayersMap.vue";
import { ref } from 'vue';

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
        SimpleKeyboard,
        OpenLayersMap
    },
    data(){
        return {
            searchQuery: '',
            items: [],
            inventory: [],
            showResults: false,
            showKeyboard: false,
            visible: false,
            openMap: false,
            inStock: false,
            layout: "normal",
            input: "",
            foundCount: 0,
            locations: [],
            loc_num: 0,
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
    setup() {
        const center = ref([40, 40])
        const projection = ref('EPSG:4326')
        const zoom = ref(8)
        const rotation = ref(0)
        return {
            center,
            projection,
            zoom,
            rotation
        }
    },
    async mounted(){
        try {
            const response = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/machine', 
                { params: { mids:["pi1"].join(), fields:["stock"].join() } });
            const obj = response.data
            let machineParsedData = Object.keys(obj[0].stock);
            const res = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item', 
                { params: { iids:machineParsedData.join(), fields:["item_id", "name","nutrition_url", "cost", "image_url"].join()} });
            let itemParsedData = res.data;
            this.items=itemParsedData
            const respon = await axios.get('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/item');
            this.inventory = respon.data;
        } catch (e) {
            console.log("Error SearchBar.js");
        }
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
        checkItemName(){
            for(var i = 0; i < this.items.length; i++){
                if(this.inventory[i].name.toLowerCase() == this.searchQuery.toLowerCase()){
                    return this.inventory[i].item_id
                }
            }
            return null
        },
        async showMap(){
            let loc_obj  = 0
            let  response = 0
            let id = this.checkItemName()
            try{
                response = await axios.post('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/location/',
                    {"item_id": id, "latitude":37.0003434, "longitude":-122.0632395, "range": 10000}
                )
                loc_obj = response.data
            }catch(e){
                console.log("Error SearchBar.js")
            }
            this.locations = loc_obj
            this.loc_num = loc_obj.length
            this.inStock = (loc_obj.length <= 0) ? false : true
            this.openMap = true;          
        },
        closeMap(){
            this.openMap = false;
        },
        checkMap(){
            return this.openMap;
        },

    }
};