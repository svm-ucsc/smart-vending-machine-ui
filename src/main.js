import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "bootstrap";
// import $ from 'jquery'
import JQuery from 'jquery';
window.$ = JQuery;
import ItemDetail from "./components/ItemDetail.vue";
import SearchBar from "./components/SearchBar.vue";
import CartItems from "./components/CartItems.vue";
import StoreMenu from "./components/StoreMenu.vue";
import Payment from "./components/Payment.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue"
import SearchResult from './components/SearchResult.vue';
import SimpleKeyboard from "./components/SimpleKeyboard.vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import OpenLayersMap from '../node_modules/vue3-openlayers'
import QrCode from './components/QrCode.vue';
import '../node_modules/vue3-openlayers/dist/vue3-openlayers.css'
import 'bootstrap'
library.add(fas)

const axios = require("axios");

// Holds global data for application
const store = createStore({
    state(){
        return{
            isDevMode: Boolean,
            cartInfo: [],
            subTotal: Number,
            machineID: String,
            coordinates: Object,
            order_id: String,
            paypal_order_id: String
        }
    },

    mutations: {
        insertToCart(state, data) {
            if (state.cartInfo.length > 0) {
                // if list isn't empty, we need to look through it first
                let temp = state.cartInfo.find((o) => o.itemId === data.itemId); // temp returns an object so we need to parse it's properties
                // if the element exists in the cart already and it matches what we want to update it, just update the quantity instead
                if (temp != null && temp.itemId === data.itemId) {
                    temp.quantity += data.quantity;
                } else {
                    // element doesn't exist, so push it
                    state.cartInfo.push(data);
                }
            } else {
                // empty list condition
                state.cartInfo.push(data);
            }
        },
        removeFromCart(state, indexToDelete) {
            // data stores the index of where the element is to be removed
            state.cartInfo.splice(indexToDelete, 1); // delete 1 element at indexToDelete
        },

        async captureOrderID(state) {
            // simply send the order_id to the database that was created upon the /order post request from cartitems.js
            try {
                await axios.post(
                    "http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/order/capture",

                    { order_id: this.state.order_id }
                );
                state.cartInfo = []; // clear the cart and all information associated with it based on return code
                state.order_id = "";
                state.paypal_order_id = "";
            } catch (e) {
                console.log("Error (main.js): Cannot capture the order");
            }
        },

        calculateTotalCost(state) {
            let subTotal = 0;
            if (state.cartInfo.length > 0) {
                // calculate cost of each element and cart total
                for (let i = 0; i < state.cartInfo.length; ++i) {
                    let curQuantity = state.cartInfo[i].quantity;
                    let costPerItem = state.cartInfo[i].itemCost;
                    subTotal += curQuantity * costPerItem;
                }
                // store running subtotal in a Vuex global store
                this.subTotal = subTotal;
            }
        },
        initMode(state){
            state.isDevMode = false;
        },
        switchMode(state){
            state.isDevMode = !state.isDevMode;
        },
        setMachineID(state){
            state.machineID = "pi1";
        },
        setClosestMachineID(state, id){
            state.machineID = id;
        },
        setCoordinates(state, coordinatesObj){
            state.coordinates = coordinatesObj;
        }

    },
    getters: {
        checkMode: state => {
            return state.isDevMode;
        },
        checkMachineID: state => {
            return state.machineID;
        },
        checkCoordinates: state => {
            return state.coordinates;
        }
    }
});

const app = createApp(App);
app.use(store);
app.use(OpenLayersMap);
app.component('ItemDetail', ItemDetail);
app.component('SearchBar', SearchBar);
app.component('SearchResult', SearchResult);
app.component('CartItems', CartItems);
app.component('StoreMenu', StoreMenu);
app.component('SimpleKeyboard', SimpleKeyboard);
app.component('Payment', Payment);
app.component('OpenLayersMap', OpenLayersMap);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.component("LoadingSpinner", LoadingSpinner);
app.component('QrCode', QrCode);

app.mount('#app')

