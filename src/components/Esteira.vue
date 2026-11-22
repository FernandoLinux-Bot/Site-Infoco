<script setup lang="ts">
import { ScrollTrigger } from './motion/gsap';
import { COM_MOVIMENTO, faixa, limitar, usePalco } from './motion/palco';
import { GRUPO_NOME, MODULOS } from '../data/sicc';

/**
 * Os módulos como uma esteira. No desktop a seção prende e a fila corre de
 * lado com a rolagem; o cartão mais perto da linha de foco fica inteiro e os
 * outros recuam. No celular, e com movimento reduzido, é um carrossel comum,
 * arrastável com o dedo.
 */
const dois = (i: number) => String(i).padStart(2, '0');
const total = dois(MODULOS.length);

let trilho: HTMLElement | null = null;
let itens: HTMLElement[] = [];
let contador: HTMLElement | null = null;
let centros: number[] = [];
let viagem = 0;
let largura = 0;
let perto = -1;

usePalco('palco', {
    media: `(min-width: 834px) and ${COM_MOVIMENTO}`,
    montar(secao) {
        trilho = secao.querySelector<HTMLElement>('.esteira-trilho');
        itens = Array.from(secao.querySelectorAll<HTMLElement>('.esteira-item'));
        contador = secao.querySelector<HTMLElement>('.esteira-contador b');
        const fixo = secao.querySelector<HTMLElement>('.esteira-fixo');
        perto = -1;
        // A rolagem vertical dura o mesmo que a viagem horizontal: um pixel de
        // roda move a fila um pixel. `offsetLeft` é a posição de leiaute, sem a
        // transformação, então a medida não muda enquanto a fila anda.
        const medir = () => {
            if (!trilho || !fixo) return;
            largura = fixo.clientWidth;
            viagem = Math.max(0, trilho.offsetLeft + trilho.scrollWidth - largura * 0.94);
            centros = itens.map(el => trilho!.offsetLeft + el.offsetLeft + el.offsetWidth / 2);
            secao.style.height = `${fixo.offsetHeight + viagem}px`;
        };
        medir();
        ScrollTrigger.addEventListener('refreshInit', medir);
        return () => {
            ScrollTrigger.removeEventListener('refreshInit', medir);
            [secao, trilho, ...itens].forEach(el => el?.removeAttribute('style'));
        };
    },
    aplicar(p, secao) {
        if (!trilho) return;
        const k = faixa(p, 0.04, 0.96);
        const dx = -k * viagem;
        trilho.style.transform = `translate3d(${dx.toFixed(1)}px, 0, 0)`;
        // A linha de foco anda junto: nasce no centro do primeiro cartão e
        // termina no centro do último, então a contagem vai de 01 até o fim.
        const ultimo = centros.length - 1;
        const foco = centros[0] + (centros[ultimo] - viagem - centros[0]) * k;
        let melhor = Infinity;
        let indice = 0;
        itens.forEach((el, i) => {
            const fora = Math.abs((centros[i] + dx - foco) / largura);
            el.style.setProperty('--f', limitar(fora * 1.6).toFixed(3));
            if (fora < melhor) {
                melhor = fora;
                indice = i;
            }
        });
        secao.style.setProperty('--k', k.toFixed(4));
        if (indice !== perto && contador) {
            perto = indice;
            contador.textContent = dois(indice + 1);
        }
    },
});
</script>

<template>
    <section ref="palco" class="tile tile--parchment esteira">
        <div class="esteira-fixo">
            <div class="esteira-intro">
                <span class="eyebrow">Módulos</span>
                <h2 class="t-display">Cada etapa tem a sua tela. Todas falam a mesma língua.</h2>
                <p class="t-body">
                    {{ MODULOS.length }} módulos integrados, do Plano de Contratação Anual à prestação de contas.
                </p>
                <p class="esteira-contador" aria-hidden="true">
                    <span><b>01</b> / {{ total }}</span>
                    <span class="esteira-barra"><span /></span>
                </p>
                <RouterLink to="/solucoes" class="link-action">
                    Todos os módulos <span class="chev">›</span>
                </RouterLink>
            </div>

            <ol class="esteira-trilho" tabindex="0" aria-label="Módulos do SICC">
                <li v-for="(m, i) in MODULOS" :key="m.id" class="esteira-item">
                    <article class="util-card esteira-cartao">
                        <div class="esteira-cartao-topo">
                            <span class="esteira-n" aria-hidden="true">{{ dois(i + 1) }}</span>
                            <span class="chip chip--muted">{{ GRUPO_NOME[m.grupo] }}</span>
                        </div>
                        <span class="card-index">{{ m.resumo }}</span>
                        <h3>{{ m.nome }}</h3>
                        <p>{{ m.descricao }}</p>
                        <div class="util-card-foot">
                            <RouterLink :to="`/solucoes#${m.id}`" class="link-action" style="font-size: 14px">
                                Detalhes <span class="chev">›</span>
                            </RouterLink>
                        </div>
                    </article>
                </li>
            </ol>
        </div>
    </section>
</template>
