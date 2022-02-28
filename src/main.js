import { createApp} from 'vue'
import { createStore} from 'vuex'
import App from './App.vue'
import 'bootstrap'
import ItemDetail from './components/ItemDetail.vue';
import SearchBar from './components/SearchBar.vue';
import CartItems from './components/CartItems.vue';

// Holds global data for application
const store = createStore({
    state(){
        return{
            cartInfo: []
        };
    },
 
    mutations: {

        insertToCart(state, data){
            // data will be an object pushed onto cartInfo array that holds {foodName, quantity}
            if(state.cartInfo.length > 0){ // if list isn't empty, we need to look through it first
                let temp = state.cartInfo.find(o => o.foodName === data.foodName); // temp returns an object so we need to parse it's properties
                // console.log(`found: ` + JSON.stringify(temp));
                // if the element exists in the cart already and it matches what we want to update it, just update the quantity instead
                if((temp != null) && (temp.foodName === data.foodName)){
                    console.log("elem exists, updating amount instead");
                    temp.quantity = data.quantity;
                }else{
                    console.log("elem doesn't exist, lets add it");
                    state.cartInfo.push(data);
                }
               
            }else{
                console.log("cart is empty!");
                state.cartInfo.push(data);
            }
        },
        removeFromCart(state, indexToDelete){
            // data stores the index of where the element is to be removed
            console.log(`The index requested to delete entry is: ${JSON.stringify(indexToDelete)}`);
            state.cartInfo.splice(indexToDelete,1); // delete 1 element at indexToDelete
        }
    }
});

const app = createApp(App);
app.use(store);
app.component('ItemDetail', ItemDetail);
app.component('SearchBar', SearchBar);
app.component('CartItems', CartItems);

app.mount('#app')
