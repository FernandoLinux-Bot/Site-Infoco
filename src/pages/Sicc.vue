<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { AnimatePresence, motion } from 'motion-v';
import { CICLO_DEMANDA, PERGUNTAS } from '../data/sicc';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';
import { gsap, semMovimento } from '../components/motion/gsap';
import { CONHECER } from '../data/links';

/* --------------------------------------------------------------- Fluxo --- */
/**
 * As seis barras se preenchem conforme a rolagem atravessa a seção.
 * É `scrub`: a barra acompanha o dedo nos dois sentidos, em vez de disparar
 * uma vez e terminar sozinha. Cada barra tem a sua fatia do trecho, então a
 * quarta só começa quando a terceira fecha.
 */
const secao = ref<HTMLDivElement | null>(null);
let desfazerFluxo: (() => void) | undefined;

onMounted(() => {
    const el = secao.value;
    if (!el) return;
    const barras = gsap.utils.toArray<HTMLElement>('.flow-rule', el);
    if (!barras.length) return;

    if (semMovimento()) {
        gsap.set(barras, { scaleX: 1 });
        return;
    }

    gsap.set(barras, { scaleX: 0, transformOrigin: 'left center' });
    const linha = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 62%', scrub: 0.5 },
    });
    barras.forEach(barra => linha.to(barra, { scaleX: 1, ease: 'none' }, '>'));

    desfazerFluxo = () => {
        linha.scrollTrigger?.kill();
        linha.kill();
        gsap.set(barras, { clearProps: 'transform' });
    };
});
onBeforeUnmount(() => desfazerFluxo?.());

/* ---------------------------------------------------------- Tramitação --- */
const ACOES = [
    { grupo: 'Andamento', itens: ['Análise Orçamentária', 'Controle Interno', 'Análise Jurídica', 'Análise Técnica', 'Cotação', 'Mapa de Riscos', 'Autoridade', 'Revisão Interna'] },
    { grupo: 'Iniciar Contratação', itens: ['Licitação', 'Contratação Direta'] },
    { grupo: 'Outras ações', itens: ['Retornar para elaboração', 'Cancelar demanda', 'Excluir demanda'] },
];

/* ------------------------------------------------------------ SICC iA --- */
const IA_PONTOS = [
    { t: 'Rascunho do ETP', d: 'A partir do problema identificado na demanda, monta resumo, necessidade, requisitos, soluções de mercado e solução adotada — para a equipe revisar seção por seção.' },
    { t: 'Sugestão de riscos', d: 'Propõe riscos a partir do objeto, com impacto, probabilidade, dano e ações preventivas e de contingência. A equipe aceita, ajusta ou recusa cada um.' },
    { t: 'DFDs automáticos', d: 'Gera os documentos de formalização de demanda a partir do que já está cadastrado no sistema.' },
    { t: 'Itens do orçamento', d: 'Na compra direta, lê os itens do orçamento anexado em vez de exigir digitação linha a linha.' },
];

/* --------------------------------------------------------- Documentos --- */
const DOCS = [
    { n: 'DFD', d: 'Documento de Formalização de Demanda, com fundamento no inciso VII do art. 12 da Lei 14.133/2021.' },
    { n: 'ETP', d: 'Estudo Técnico Preliminar completo, do problema à declaração de viabilidade.' },
    { n: 'Mapa de Riscos', d: 'Matriz 5×5 de impacto e probabilidade, fundamentada no art. 18, inciso X.' },
    { n: 'TR', d: 'Termo de Referência por tipo de objeto: bens, serviços, serviços sem mão de obra e engenharia.' },
    { n: 'Ata-RP', d: 'Ata de registro de preço com os itens, o fornecedor e a vigência.' },
    { n: 'Despachos', d: 'Autorizações, despachos de cotação, de elaboração do TR e para a controladoria.' },
];

/* --------------------------------------------------------------- FAQ ---- */
const aberta = ref<number | null>(0);
const alternar = (i: number) => (aberta.value = aberta.value === i ? null : i);

/* ---------------------------------------------------------- Glossário --- */
const GLOSSARIO = [
    ['PCA', 'Plano de Contratação Anual — o planejamento do exercício.'],
    ['DFD', 'Documento de Formalização de Demanda — a unidade de planejamento que compõe o PCA.'],
    ['ETP', 'Estudo Técnico Preliminar — justifica a contratação e conclui pela viabilidade.'],
    ['TR', 'Termo de Referência — descreve o objeto e as condições da contratação.'],
    ['SRP', 'Sistema de Registro de Preços.'],
    ['IRP', 'Intenção de Registro de Preços — divulgada para outros órgãos participarem.'],
    ['ARP', 'Ata de Registro de Preço.'],
    ['P.ADM', 'Processo administrativo — o número que acompanha a demanda do início ao fim.'],
    ['PNCP', 'Portal Nacional de Contratações Públicas.'],
    ['SIGA / TCM-BA', 'Sistema do Tribunal de Contas dos Municípios da Bahia.'],
    ['Apostilamento', 'Registro de alteração que não altera o objeto nem exige aditivo.'],
    ['Adesão', 'A carona: aderir a uma ata de registro de preço de outro órgão.'],
] as const;
</script>

<template>
    <!-- Hero -->
    <section class="tile tile--light hero">
        <div class="container container-narrow">
            <motion.span
                class="eyebrow"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: EASE_EXPO }"
            >
                SICC
            </motion.span>
            <h1 class="t-hero">
                <WordReveal text="Sistema Integrado de" />{{ ' ' }}<em><WordReveal text="Compras e Contratações" :delay="0.15" /></em>
            </h1>
            <motion.p
                class="t-lead hero-sub"
                style="max-width: 46ch"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.4 }"
            >
                O sistema que a INFOCO desenvolve para prefeituras, câmaras e consórcios
                conduzirem a contratação pública inteira sob a Lei 14.133/2021.
            </motion.p>
            <motion.div
                class="cta-row cta-row--center"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.52 }"
            >
                <a class="btn btn-store" :href="CONHECER" target="_blank" rel="noopener noreferrer">
                    Ver o sistema por dentro
                </a>
                <RouterLink to="/solucoes" class="btn btn-secondary">Ver os módulos</RouterLink>
            </motion.div>
        </div>
    </section>

    <!-- Fluxo -->
    <section id="fluxo" class="tile tile--dark on-dark">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Ciclo de vida</span>
                    <h2 class="t-display">Seis fases entre a necessidade e o contrato.</h2>
                    <p class="t-body">
                        Uma demanda percorre o mesmo caminho em todo município. O sistema não deixa
                        pular etapa, e o histórico de cada movimentação fica registrado.
                    </p>
                </div>
            </Reveal>

            <div ref="secao" class="flow">
                <Reveal v-for="(f, i) in CICLO_DEMANDA" :key="f.fase" :delay="i * 0.06">
                    <div class="flow-step">
                        <span class="flow-rule" aria-hidden="true" />
                        <span class="flow-n">Fase {{ String(i + 1).padStart(2, '0') }}</span>
                        <h3>{{ f.fase }}</h3>
                        <p>{{ f.detalhe }}</p>
                    </div>
                </Reveal>
            </div>
        </div>
    </section>

    <!-- Tramitação -->
    <section class="tile tile--parchment">
        <div class="container container-mid">
            <div class="split split--wide">
                <Reveal>
                    <div>
                        <span class="eyebrow">Tramitação</span>
                        <h2 class="t-display">O menu de ações é o motor do processo.</h2>
                        <p class="t-body" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                            Ele muda conforme o status. No início da demanda aparecem as análises básicas;
                            na fase intermediária entram controle interno, autoridade e o início da
                            contratação; depois da cotação concluída aparece a reabertura. Quando a demanda
                            já está em contratação, o bloco de andamento desaparece.
                        </p>
                        <p class="t-body" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                            É o que impede o erro mais caro da contratação pública: mandar um processo
                            para uma fase que ele ainda não pode ocupar.
                        </p>
                        <div class="cta-row">
                            <RouterLink to="/sicc#perguntas" class="link-action">
                                Ver as perguntas frequentes <span class="chev">›</span>
                            </RouterLink>
                        </div>
                    </div>
                </Reveal>

                <Stagger class="grid" :stagger-children="0.08">
                    <StaggerItem v-for="a in ACOES" :key="a.grupo">
                        <div class="util-card">
                            <span class="card-index">{{ a.grupo }}</span>
                            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px">
                                <span v-for="item in a.itens" :key="item" class="chip">{{ item }}</span>
                            </div>
                        </div>
                    </StaggerItem>
                </Stagger>
            </div>
        </div>
    </section>

    <!-- SICC iA -->
    <section class="tile tile--dark-3 on-dark">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">SICC iA</span>
                    <h2 class="t-display">A assistência redige. A equipe decide.</h2>
                    <p class="t-body">
                        A inteligência do sistema acelera a parte escrita do processo. O texto entra como
                        rascunho — a responsabilidade técnica continua sendo da equipe de planejamento,
                        que revisa, corrige e assina.
                    </p>
                </div>
            </Reveal>
            <Stagger class="grid grid-4" :stagger-children="0.07">
                <StaggerItem v-for="p in IA_PONTOS" :key="p.t">
                    <div class="util-card util-card--dark" style="height: 100%">
                        <h3>{{ p.t }}</h3>
                        <p>{{ p.d }}</p>
                    </div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <!-- Documentos -->
    <section class="tile tile--light">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Documentos</span>
                    <h2 class="t-display">O processo sai pronto para assinar.</h2>
                    <p class="t-body">
                        Cada etapa gera o seu documento com o timbre do órgão, a partir dos modelos padrão
                        do SICC ou das minutas do próprio município. A assinatura eletrônica acontece
                        dentro do sistema.
                    </p>
                </div>
            </Reveal>
            <Stagger class="grid grid-3" :stagger-children="0.06">
                <StaggerItem v-for="d in DOCS" :key="d.n">
                    <div class="util-card" style="height: 100%">
                        <h3>{{ d.n }}</h3>
                        <p>{{ d.d }}</p>
                    </div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <!-- FAQ -->
    <section id="perguntas" class="tile tile--parchment">
        <div class="container container-narrow">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Perguntas frequentes</span>
                    <h2 class="t-display">As dúvidas que mais chegam ao suporte.</h2>
                </div>
            </Reveal>

            <div class="faq">
                <Reveal v-for="(q, i) in PERGUNTAS" :key="q.p" :delay="i * 0.03">
                    <div :class="['faq-item', { 'is-open': aberta === i }]">
                        <button
                            :id="`faq-q-${i}`"
                            class="faq-q"
                            :aria-expanded="aberta === i"
                            :aria-controls="`faq-a-${i}`"
                            @click="alternar(i)"
                        >
                            {{ q.p }}
                            <span class="faq-icon" aria-hidden="true" />
                        </button>
                        <AnimatePresence :initial="false">
                            <motion.div
                                v-if="aberta === i"
                                :id="`faq-a-${i}`"
                                class="faq-a"
                                role="region"
                                :aria-labelledby="`faq-q-${i}`"
                                :initial="{ height: 0, opacity: 0 }"
                                :animate="{ height: 'auto', opacity: 1 }"
                                :exit="{ height: 0, opacity: 0 }"
                                :transition="{ duration: 0.45, ease: EASE_EXPO }"
                            >
                                <div class="faq-a-inner">{{ q.r }}</div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Reveal>
            </div>
        </div>
    </section>

    <!-- Glossário -->
    <section class="tile tile--dark-2 on-dark">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Glossário</span>
                    <h2 class="t-display">As siglas que aparecem em toda tela.</h2>
                </div>
            </Reveal>
            <Stagger class="grid grid-3" :stagger-children="0.04">
                <StaggerItem v-for="[sigla, def] in GLOSSARIO" :key="sigla">
                    <div class="util-card util-card--dark" style="height: 100%">
                        <h3>{{ sigla }}</h3>
                        <p>{{ def }}</p>
                    </div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <!-- CTA -->
    <section class="tile tile--light">
        <div class="container container-narrow" style="text-align: center">
            <Reveal>
                <span class="eyebrow">Implantação</span>
                <h2 class="t-display">Quer o SICC no seu município?</h2>
                <p class="t-lead" style="margin-top: var(--s-md); color: var(--ink-muted-80)">
                    A equipe da INFOCO conduz a implantação, a migração e o treinamento das unidades.
                </p>
                <div class="cta-row cta-row--center">
                    <RouterLink to="/contato" class="btn btn-store">Falar com a INFOCO</RouterLink>
                    <RouterLink to="/cadastro" class="btn btn-secondary">Solicitar cadastro</RouterLink>
                </div>
            </Reveal>
        </div>
    </section>
</template>
