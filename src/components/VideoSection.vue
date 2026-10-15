<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { Reveal } from './motion';
import { VIDEOS_PUBLICADOS, type Video } from '../data/videos';

/** Capa na proporção nativa 9:16, em densidade suficiente para telas retina. */
const poster = (v: Video) =>
    `https://image.mux.com/${v.id}/thumbnail.webp?width=810&height=1440&fit_mode=preserve&time=${v.posterEm}`;

const total = VIDEOS_PUBLICADOS.length;
const secao = ref<HTMLElement | null>(null);
const trilho = ref<HTMLDivElement | null>(null);
const atual = ref(0);
/** O player pesa mais que todo o resto do site — só entra quando a seção aparece. */
const playerPronto = ref(false);

const { stop } = useIntersectionObserver(
    secao,
    entries => {
        if (!entries.some(e => e.isIntersecting)) return;
        stop();
        // Enquanto o chunk do player baixa, a capa continua no lugar.
        import('@mux/mux-player').then(() => (playerPronto.value = true));
    },
    { rootMargin: '320px' }
);

// O slide ativo vem da rolagem real do trilho, então arrastar com o dedo e
// clicar nas setas mantêm o indicador coerente.
const aoRolar = () => {
    const el = trilho.value;
    if (!el) return;
    const largura = el.clientWidth;
    if (!largura) return;
    atual.value = Math.round(el.scrollLeft / largura);
};

const irPara = (i: number) => {
    const el = trilho.value;
    if (!el) return;
    const alvo = Math.max(0, Math.min(i, total - 1));
    el.scrollTo({ left: alvo * el.clientWidth, behavior: 'smooth' });
};
</script>

<template>
    <section v-if="total > 0" ref="secao" class="tile tile--black on-dark">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Em movimento</span>
                    <h2 class="t-display">Veja o sistema por dentro.</h2>
                    <p class="t-body">
                        Conversas curtas sobre como o SICC conduz o planejamento e a contratação.
                    </p>
                </div>
            </Reveal>

            <Reveal :delay="0.1">
                <div class="video-carrossel">
                    <div
                        ref="trilho"
                        class="video-trilho"
                        tabindex="0"
                        role="group"
                        aria-roledescription="carrossel"
                        aria-label="Vídeos sobre o SICC"
                        @scroll="aoRolar"
                    >
                        <article
                            v-for="(v, i) in VIDEOS_PUBLICADOS"
                            :key="v.id"
                            class="video-card"
                            aria-roledescription="slide"
                            :aria-label="v.titulo"
                        >
                            <div class="video-frame">
                                <!-- `preload` só no slide visível: dois players buscando
                                     manifesto ao mesmo tempo atrasa o que a pessoa vai ver. -->
                                <mux-player
                                    v-if="playerPronto"
                                    stream-type="on-demand"
                                    :playback-id.attr="v.id"
                                    :poster.attr="poster(v)"
                                    :metadata-video-title.attr="v.titulo"
                                    accent-color="#0071e3"
                                    :preload.attr="i === atual ? 'metadata' : 'none'"
                                />
                                <img v-else :src="poster(v)" alt="" aria-hidden="true" loading="lazy" />
                            </div>
                            <div class="video-legenda">
                                <h3>{{ v.titulo }}</h3>
                                <p>{{ v.descricao }}</p>
                            </div>
                        </article>
                    </div>

                    <template v-if="total > 1">
                        <button
                            class="video-seta video-seta--ant"
                            :disabled="atual === 0"
                            aria-label="Vídeo anterior"
                            @click="irPara(atual - 1)"
                        >
                            ‹
                        </button>
                        <button
                            class="video-seta video-seta--prox"
                            :disabled="atual === total - 1"
                            aria-label="Próximo vídeo"
                            @click="irPara(atual + 1)"
                        >
                            ›
                        </button>
                        <div class="video-pontos" role="tablist" aria-label="Escolher vídeo">
                            <button
                                v-for="(v, i) in VIDEOS_PUBLICADOS"
                                :key="v.id"
                                role="tab"
                                :aria-selected="i === atual"
                                :aria-label="v.titulo"
                                :class="['video-ponto', { 'is-active': i === atual }]"
                                @click="irPara(i)"
                            />
                        </div>
                    </template>
                </div>
            </Reveal>
        </div>
    </section>
</template>
