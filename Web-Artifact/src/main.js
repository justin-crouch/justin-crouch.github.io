/**
 * main
 * 
 * @description entry javascript file;
 *      creates the application, initializes plugins
 */

// Import plugins
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Import app component
import App from './App.vue';

// Create Vue app
const app = createApp(App);

// Load plugins
const pinia = createPinia();
app.use(pinia);

// Mount Vue app onto app element
app.mount('#app');
