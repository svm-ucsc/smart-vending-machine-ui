import { createApp} from 'vue'
import { createStore} from 'vuex'
import App from './App.vue'
import 'bootstrap'
import ItemDetail from './components/ItemDetail.vue';
import SearchBar from './components/SearchBar.vue';
import CartItems from './components/CartItems.vue';

// Holds data for application
const store = createStore({
    state(){
        return{
            cartInfo: []
            // cartQuantity: 0, // would like to grab the amount
            // itemNameCart: "" // would like to grab the name
        };
    },
    mutations: {
        updateCart(state, data){
            state.cartInfo.push(data); // data will store name and quantity
        }
    }
});

const app = createApp(App);
app.use(store);
app.component('ItemDetail', ItemDetail);
app.component('SearchBar', SearchBar);
app.component('CartItems', CartItems);

app.mount('#app')
