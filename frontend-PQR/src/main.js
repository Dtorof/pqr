import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import SimpleTypeahead from 'vue3-simple-typeahead';
// import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS

import './assets/main.css'




const app = createApp(App)
// app.use(SimpleTypeahead);

app.use(createPinia())
app.use(router)

app.mount('#app')
