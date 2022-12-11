import { createApp } from 'vue'
import App from './App.vue'
import VueSignaturePad from 'vue-signature-pad';
import VeeValidate from 'vee-validate';

const app = createApp(App)

app.use(VueSignaturePad);
app.use(VeeValidate)

app.mount('#app')
