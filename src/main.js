import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import ItemDetail from './components/ItemDetail.vue';
// import SearchBar from './components/SearchBar.vue';

const app = createApp(App);
app.component('ItemDetail', ItemDetail);
// app.component('search-bar', SearchBar);

app.mount('#app')
