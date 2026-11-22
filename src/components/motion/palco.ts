/**
 * Palco de rolagem: uma seção alta com um filho `position: sticky`, cuja
 * coreografia inteira é função de um único número, o progresso `p` de 0 a 1.
 *
 * Três regras, as mesmas que seguram o resto da camada de rolagem:
 *  · Nada passa pelo estado do Vue enquanto a página rola. O `aplicar` escreve
 *    direto no DOM, quase sempre em propriedades CSS (`--sobe`, `--k`), e o
 *    desenho de cada quadro fica no index.css.
 *  · O palco só existe enquanto a media query vale. Com movimento reduzido (ou
 *    fora da largura pedida) a classe `is-ativo` nunca entra e a seção fica no
 *    leiaute estático, com todo o conteúdo na tela.
 *  · O gatilho é posição, não fração: começa quando o topo da seção encosta no
 *    chrome fixo e termina quando o fim dela chega ao fim da janela.
 */
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import { gsap } from './gsap';

export const limitar = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
/** Onde `v` está entre `a` e `b`, de 0 a 1. */
export const faixa = (v: number, a: number, b: number) => limitar((v - a) / (b - a));
export const suave = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Grava um número numa propriedade CSS do próprio elemento que a usa, e só
 * quando o valor muda. Escrever na raiz da seção faria o navegador recalcular
 * o estilo da subárvore inteira a cada quadro; no alvo, o custo é de um nó.
 */
const ultimo = new WeakMap<Element, Record<string, string>>();
export function gravar(el: HTMLElement | SVGElement | null | undefined, prop: string, valor: number) {
    if (!el) return;
    const texto = valor.toFixed(3);
    let visto = ultimo.get(el);
    if (!visto) ultimo.set(el, (visto = {}));
    if (visto[prop] === texto) return;
    visto[prop] = texto;
    el.style.setProperty(prop, texto);
}
/** Esquece o que foi gravado: quem limpa o `style` do elemento chama isto. */
export const esquecer = (...els: (Element | null | undefined)[]) => els.forEach(el => el && ultimo.delete(el));

export const COM_MOVIMENTO = '(prefers-reduced-motion: no-preference)';

/** Altura das barras fixas: é abaixo delas que o palco prende. */
export const alturaChrome = () => {
    const main = document.querySelector('.app-main');
    return main ? parseFloat(getComputedStyle(main).paddingTop) || 0 : 0;
};

type Opcoes = {
    /** Quando o palco vale. Fora disso, a seção é estática. */
    media?: string;
    /** Roda ao ligar o palco, já com `is-ativo` na seção. Devolve a limpeza. */
    montar?: (secao: HTMLElement) => void | (() => void);
    /** Roda a cada quadro em que o progresso muda. */
    aplicar: (p: number, secao: HTMLElement) => void;
};

export function usePalco(chave: string, { media = COM_MOVIMENTO, montar, aplicar }: Opcoes) {
    const el = useTemplateRef<HTMLElement>(chave);
    let mm: gsap.MatchMedia | undefined;

    onMounted(() => {
        const secao = el.value;
        if (!secao) return;
        mm = gsap.matchMedia();
        mm.add(media, () => {
            secao.classList.add('is-ativo');
            const limpar = montar?.(secao);
            const estado = { p: 0 };
            aplicar(0, secao);
            gsap.to(estado, {
                p: 1,
                ease: 'none',
                onUpdate: () => aplicar(estado.p, secao),
                scrollTrigger: {
                    trigger: secao,
                    start: () => `top ${alturaChrome()}px`,
                    end: 'bottom bottom',
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    // Fora da tela, as animações em laço do palco param.
                    onToggle: self => secao.classList.toggle('is-visivel', self.isActive),
                },
            });
            return () => {
                limpar?.();
                secao.classList.remove('is-ativo', 'is-visivel');
            };
        });
    });
    onBeforeUnmount(() => mm?.revert());
}
