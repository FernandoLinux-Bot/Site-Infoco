/**
 * Configuração única do GSAP.
 *
 * O site usa duas engines de propósito, cada uma no que faz melhor:
 *  · GSAP + ScrollTrigger — tudo que é dirigido pela rolagem (revelações,
 *    parallax, barras de progresso do fluxo).
 *  · framer-motion — tudo que é presença e layout: transição de rota,
 *    acordeão, gaveta e a pílula que desliza entre as abas. São coisas que
 *    dependem de o React desmontar o elemento *depois* da animação, e é
 *    exatamente o que o AnimatePresence resolve e o GSAP não.
 *
 * Um detalhe que o ScrollTrigger corrige de graça: ele dispara por posição do
 * gatilho na tela, não por fração da altura do elemento. O bug de seção em
 * branco que tínhamos — `amount: 0.2` num bloco de 3721px numa janela de 664px
 * — simplesmente não existe neste modelo.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

let pronto = false;

export function prepararGsap() {
    if (pronto || typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    // A curva única do design system, a mesma do CSS: cubic-bezier(.16,1,.3,1).
    CustomEase.create('expoOut', 'M0,0 C0.16,1 0.3,1 1,1');
    gsap.defaults({ ease: 'expoOut', duration: 0.8 });
    pronto = true;
}

prepararGsap();

/** O usuário pediu menos movimento? Então nada se move — e nada fica escondido. */
export const semMovimento = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Ponto de partida padrão das revelações.
 * `top 88%` = o topo do elemento cruzando 88% da altura da janela. Vale para
 * um bloco de 100px e para um de 4000px igualmente — é o que a fração de
 * altura não conseguia garantir.
 */
export const INICIO = 'top 88%';

export { gsap, ScrollTrigger };
