import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import '../index.css';

const app = createApp(App).use(router);
// Monta depois da primeira navegação: a página já nasce com a rota resolvida,
// e o ScrollManager encontra a âncora de quem chega por link direto.
router.isReady().then(() => app.mount('#root'));
