import { createApp} from 'vue'
import { createStore} from 'vuex'
import App from './App.vue'
import ItemDetail from './components/ItemDetail.vue';
import SearchBar from './components/SearchBar.vue';
import SearchResult from './components/SearchResult.vue';
import CartItems from './components/CartItems.vue';
import StoreMenu from './components/StoreMenu.vue';
import Payment from './components/Payment.vue';
import SimpleKeyboard from "./components/SimpleKeyboard.vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import OpenLayersMap from '../node_modules/vue3-openlayers'
import '../node_modules/vue3-openlayers/dist/vue3-openlayers.css'
import 'bootstrap'
library.add(fas)

const axios = require('axios');

// Holds global data for application
const store = createStore({
    state(){
        return{
            isDevMode: Boolean,
            cartInfo: [],
            subTotal: Number,
            machineID: String,
            coordinates: Object
        };
    },
 
    mutations: {
        insertToCart(state, data){
            if(state.cartInfo.length > 0){ // if list isn't empty, we need to look through it first
                let temp = state.cartInfo.find(o => o.itemId === data.itemId); // temp returns an object so we need to parse it's properties
                // if the element exists in the cart already and it matches what we want to update it, just update the quantity instead
                if((temp != null) && (temp.itemId === data.itemId)){
                    temp.quantity += data.quantity;
                }else{ // element doesn't exist, so push it
                    state.cartInfo.push(data);
                }
            }else{ // empty list condition
                state.cartInfo.push(data);
            }          
        },
        removeFromCart(state, indexToDelete){
            // data stores the index of where the element is to be removed
            state.cartInfo.splice(indexToDelete,1); // delete 1 element at indexToDelete
        },
        async sendOrderToDB(state){
            // send the cartInfo by parsing cartInfo obj and reassigning to id:quantity format        
            let orderObj = state.cartInfo.reduce(
                (orderObj, item) => Object.assign(orderObj, { [item.itemId]: item.quantity }), {});

            // need to update this to pass total price amount as well (in cents)
            try{
                await axios.post('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/order/',
                    {"machine_id": "pi1", "items": orderObj} //, "totalCost": this.subTotal}
                    // right now the post request will fail because the API cannot handle the subTotal receipt yet
                )
            }catch(e){
                console.log("Error (main.js): Cannot place the order")
            }

            // when API Call is successful/working, this will be moved into the try block
            state.cartInfo = {}; // clear the cart and all information associated with it based on return code
        },
        calculateTotalCost(state){
            let subTotal = 0;
            if (state.cartInfo.length > 0){
                // calculate cost of each element and cart total
                for(let i=0; i < state.cartInfo.length; ++i){
                    let curQuantity = state.cartInfo[i].quantity;
                    let costPerItem = state.cartInfo[i].itemCost;
                    subTotal += curQuantity * costPerItem;
                }
            }
            // store running subtotal in a Vuex global store
            this.subTotal = subTotal;
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

app.mount('#app')