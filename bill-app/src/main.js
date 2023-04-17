import { createApp } from 'vue'
import { createPinia } from 'pinia'

// configure les defaults d'axios pour notre application
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

import App from './App.vue'
import BButton from '@/components/BButton.vue'
import router from './router'

// import de notre propre css globale (format SCSS)
import './assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// import global d'un composant
app.component('BButton', BButton)

app.mount('#app')
