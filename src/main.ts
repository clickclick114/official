import Tres from '@tresjs/core'
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Import lazy loader
import VueLazyload from 'vue-lazyload'

const app = createApp(App)

registerPlugins(app)

// Use lazy loader
app.use(VueLazyload, {
    preLoad: 1.3,
    error: '@/src/assets/error-image-photo-icon.png', // Path to error image
    loading: '@/src/assets/loading.gif', // Path to loading image
    attempt: 1
})

app.use(Tres)
app.mount('#app')
