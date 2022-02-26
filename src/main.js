import { createApp} from 'vue'
import App from './App.vue'
import 'bootstrap'
import ItemDetail from './components/ItemDetail.vue';
import SearchBar from './components/SearchBar.vue';
import CartItems from './components/CartItems.vue';
import Menu from './components/Menu.vue';


const app = createApp(App);
app.component('ItemDetail', ItemDetail);
app.component('SearchBar', SearchBar);
app.component('CartItems', CartItems);
app.component('StoreMenu', Menu);

app.mount('#app')
