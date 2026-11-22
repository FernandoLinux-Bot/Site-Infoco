<script setup lang="ts">
import { Reveal } from './motion';
import { ScrollTrigger } from './motion/gsap';
import { faixa, limitar, suave, usePalco } from './motion/palco';
import { CICLO_DEMANDA } from '../data/sicc';

/**
 * O ciclo da demanda, desenhado enquanto a página rola. A seção prende e as
 * fases se traçam uma atrás da outra, do plano anual ao contrato, com um
 * marcador correndo no trecho que está sendo desenhado.
 *
 * O desenho sai dos dados: uma onda com um arco por fase de CICLO_DEMANDA.
 * Com movimento reduzido o palco não liga, a linha já nasce inteira e as
 * fases aparecem todas em lista.
 */
const LARGURA = 1200;
const MEIO = 250;
const AMPLITUDE = 170;
const BORDA = 150;
const RAIO = 54;
const passo = (LARGURA - BORDA * 2) / CICLO_DEMANDA.length;
const x = (i: number) => BORDA + i * passo;
const dois = (i: number) => String(i).padStart(2, '0');

const fases = CICLO_DEMANDA.map((f, i) => {
    const sobe = i % 2 === 0;
    const pico = MEIO + (sobe ? -AMPLITUDE : AMPLITUDE);
    return {
        ...f,
        n: dois(i + 1),
        d: `M${x(i)} ${MEIO} C ${x(i) + 50} ${pico}, ${x(i + 1) - 50} ${pico}, ${x(i + 1)} ${MEIO}`,
        rx: (x(i) + x(i + 1)) / 2,
        // O arco de Bézier chega a 3/4 da distância até o ponto de controle.
        ry: sobe ? MEIO - AMPLITUDE * 0.75 - 18 : MEIO + AMPLITUDE * 0.75 + 30,
    };
});
const estacoes = fases.slice(1).map((_, i) => x(i + 1));
const total = dois(fases.length);
const fim = x(fases.length) + RAIO;

let tracos: SVGPathElement[] = [];
let rotulos: Element[] = [];
let pontos: Element[] = [];
let itens: Element[] = [];
let marcador: SVGGElement | null = null;
let contador: HTMLElement | null = null;
let desenho: SVGSVGElement | null = null;
let sobra = 0;
let atual = -1;

function marcar(s: number) {
    atual = s;
    itens.forEach((el, i) => el.classList.toggle('is-atual', i === s));
    rotulos.forEach((el, i) => el.classList.toggle('is-atual', i <= s));
    pontos.forEach((el, i) => el.classList.toggle('is-feita', i < s));
    if (contador) contador.textContent = dois(s + 1);
}

usePalco('palco', {
    montar(secao) {
        tracos = Array.from(secao.querySelectorAll<SVGPathElement>('.ciclo-traco'));
        rotulos = Array.from(secao.querySelectorAll('.ciclo-rotulo'));
        pontos = Array.from(secao.querySelectorAll('.ciclo-estacao'));
        itens = Array.from(secao.querySelectorAll('.ciclo-fase'));
        marcador = secao.querySelector<SVGGElement>('.ciclo-marcador');
        contador = secao.querySelector<HTMLElement>('.ciclo-contador b');
        desenho = secao.querySelector<SVGSVGElement>('.ciclo-desenho');
        const janela = secao.querySelector<HTMLElement>('.ciclo-janela');
        atual = -1;
        // No celular o desenho é mais largo que a tela e acompanha o marcador;
        // `sobra` é o quanto ele passa da janela (zero no desktop).
        const medir = () => {
            if (!desenho || !janela) return;
            sobra = Math.max(0, desenho.getBoundingClientRect().width - janela.clientWidth);
        };
        medir();
        ScrollTrigger.addEventListener('refreshInit', medir);
        return () => {
            ScrollTrigger.removeEventListener('refreshInit', medir);
            desenho?.removeAttribute('style');
            tracos.forEach(t => t.removeAttribute('style'));
            secao.classList.remove('is-fim');
            [...itens, ...rotulos, ...pontos].forEach(el => el.classList.remove('is-atual', 'is-feita'));
        };
    },
    aplicar(p, secao) {
        const k = faixa(p, 0.06, 0.92);
        const u = k * tracos.length;
        const s = limitar(Math.floor(u), 0, tracos.length - 1);
        tracos.forEach((traco, i) => {
            const feito = suave(limitar(u - i));
            traco.style.strokeDashoffset = String(1 - feito);
            if (i === s && marcador) {
                const pt = traco.getPointAtLength(traco.getTotalLength() * feito);
                marcador.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
            }
        });
        if (s !== atual) marcar(s);
        secao.classList.toggle('is-fim', k >= 0.995);
        if (desenho) desenho.style.transform = sobra ? `translate3d(${(-k * sobra).toFixed(1)}px, 0, 0)` : '';
    },
});
</script>

<template>
    <section id="ciclo" class="tile tile--dark on-dark ciclo">
        <div ref="palco" class="ciclo-palco">
            <div class="ciclo-fixo">
                <div class="container container-mid ciclo-quadro">
                    <header class="ciclo-topo">
                        <div>
                            <span class="eyebrow">O sistema</span>
                            <h2 class="t-display">O SICC não é um módulo. É o <em>ciclo inteiro</em>.</h2>
                        </div>
                        <p class="ciclo-contador" aria-hidden="true">Fase <b>01</b> / {{ total }}</p>
                    </header>

                    <div class="ciclo-janela">
                        <svg
                            class="ciclo-desenho"
                            :viewBox="`0 0 ${LARGURA} ${MEIO * 2}`"
                            role="img"
                            :aria-label="`O ciclo da demanda em ${fases.length} fases, do plano anual ao contrato assinado.`"
                        >
                            <!-- O caminho inteiro em fantasma; por cima, os trechos traçados. -->
                            <path v-for="f in fases" :key="`g-${f.fase}`" class="ciclo-fantasma" :d="f.d" />
                            <path v-for="f in fases" :key="f.fase" class="ciclo-traco" :d="f.d" pathLength="1" />

                            <circle class="ciclo-corpo" :cx="BORDA - RAIO" :cy="MEIO" :r="RAIO" />
                            <text class="ciclo-sigla" :x="BORDA - RAIO" :y="MEIO + 7" text-anchor="middle">PCA</text>
                            <text class="ciclo-legenda" :x="BORDA - RAIO" :y="MEIO - RAIO - 18" text-anchor="middle">Plano anual</text>

                            <circle class="ciclo-corpo ciclo-corpo--fim" :cx="fim" :cy="MEIO" :r="RAIO" />
                            <path class="ciclo-visto" :d="`M${fim - 20} ${MEIO + 2} l14 14 l26 -30`" />
                            <text class="ciclo-legenda" :x="fim" :y="MEIO - RAIO - 18" text-anchor="middle">Contrato assinado</text>

                            <circle v-for="cx in estacoes" :key="cx" class="ciclo-estacao" :cx="cx" :cy="MEIO" r="5" />

                            <text v-for="f in fases" :key="`r-${f.fase}`" class="ciclo-rotulo" :x="f.rx" :y="f.ry" text-anchor="middle">
                                {{ f.fase }}
                            </text>

                            <g class="ciclo-marcador" :transform="`translate(${BORDA} ${MEIO})`">
                                <circle class="ciclo-halo" r="13" />
                                <circle class="ciclo-ponta" r="5" />
                            </g>
                        </svg>
                    </div>

                    <ol class="ciclo-fases">
                        <li v-for="f in fases" :key="f.fase" class="ciclo-fase">
                            <span class="ciclo-fase-n">{{ f.n }}</span>
                            <h3>{{ f.fase }}</h3>
                            <p>{{ f.detalhe }}</p>
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <div class="container container-mid ciclo-texto">
            <Reveal>
                <div class="split split--wide">
                    <div>
                        <p class="t-body" style="color: var(--body-muted)">
                            Planejar, estudar, precificar, licitar, contratar e prestar contas costumam
                            viver em sistemas diferentes — e é aí que o dado se perde. No SICC, o objeto
                            cadastrado no DFD é o mesmo objeto do ETP, da cotação, do edital e do contrato.
                        </p>
                        <div class="cta-row">
                            <RouterLink to="/sicc" class="btn btn-primary">Ver o SICC em detalhe</RouterLink>
                        </div>
                    </div>
                    <ul class="feature-list">
                        <li>Um catálogo de objetos e itens que atravessa todos os módulos</li>
                        <li>Assinatura eletrônica de DFD, TR, ETP, Ata-RP e autuação dentro do sistema</li>
                        <li>Publicação no PNCP e envio ao SIGA / TCM-BA a partir do mesmo cadastro</li>
                    </ul>
                </div>
            </Reveal>
        </div>
    </section>
</template>
