import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import "vue-toastification/dist/index.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const toastOptions = {
  position: 'bottom-right',
  timeout: 6000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
  showCloseButtonOnHover: true,
  icon: true
}

app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions) // Make sure this is before mount

app.mount('#app')
