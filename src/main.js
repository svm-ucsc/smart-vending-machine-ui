import { createApp} from 'vue'
import { createStore} from 'vuex'
import App from './App.vue'
import 'bootstrap'
// import $ from 'jquery'
import ItemDetail from './components/ItemDetail.vue';
import SearchBar from './components/SearchBar.vue';
import CartItems from './components/CartItems.vue';
import StoreMenu from './components/StoreMenu.vue';

const axios = require('axios');

// Holds global data for application
const store = createStore({
    state(){
        return{
            cartInfo: []
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
            console.log(`The index requested to delete entry is: ${JSON.stringify(indexToDelete)}`);
            state.cartInfo.splice(indexToDelete,1); // delete 1 element at indexToDelete
        },
        async sendOrderToDB(state){
            // send the cartInfo by parsing cartInfo obj and reassigning to id:quantity format        
            let orderObj = state.cartInfo.reduce(
            (orderObj, item) => Object.assign(orderObj, { [item.itemId]: item.quantity }), {});

            try{
                await axios.post('http://ec2-54-167-36-58.compute-1.amazonaws.com:3000/order/',
                
                    {"machine_id": "string", "items": orderObj }
            
                )

            }catch(e){
                console.log("Error: Cannot place the order")
            }

            // TODO:
            // if API Call is successful:
            // state.cartInfo = {}; // clear the cart and all information associated with it based on return code
        }
    }
});

const app = createApp(App);
app.use(store);
app.component('ItemDetail', ItemDetail);
app.component('SearchBar', SearchBar);
app.component('CartItems', CartItems);
app.component('StoreMenu', StoreMenu);

app.mount('#app')
