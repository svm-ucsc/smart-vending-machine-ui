import { createApp } from 'vue'

import App from './App.vue'
import ItemDetail from './components/ItemDetail.vue';

const app = createApp(App);
app.component('item-detail', ItemDetail);

app.mount('#app')
