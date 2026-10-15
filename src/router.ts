import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Sicc from './pages/Sicc.vue';
import Solucoes from './pages/Solucoes.vue';
import Institucional from './pages/Institucional.vue';
import Fornecedor from './pages/Fornecedor.vue';
import Cadastro from './pages/Cadastro.vue';
import Contact from './pages/Contact.vue';
import Noticias from './pages/Noticias.vue';
import TrabalheConosco from './pages/TrabalheConosco.vue';
import NotFound from './pages/NotFound.vue';

export const router = createRouter({
    history: createWebHistory(),
    // O "ativo" das barras é decidido à mão (ver Header.vue): sem isso o
    // RouterLink pintaria classes próprias em todo link, inclusive no rodapé.
    linkActiveClass: '',
    linkExactActiveClass: '',
    routes: [
        { path: '/', component: Home },
        { path: '/sicc', component: Sicc },
        { path: '/solucoes', component: Solucoes },
        { path: '/institucional', component: Institucional },
        { path: '/fornecedor', component: Fornecedor },
        { path: '/cadastro', component: Cadastro },
        { path: '/contato', component: Contact },
        { path: '/noticias', component: Noticias },
        { path: '/trabalhe-conosco', component: TrabalheConosco },
        { path: '/:pathMatch(.*)*', component: NotFound },
    ],
});
