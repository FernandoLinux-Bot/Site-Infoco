<script setup lang="ts">
import { motion } from 'motion-v';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';
import { useFormSubmit, useRecaptcha } from '../composables/useContactForm';

const AREAS = [
    'Desenvolvimento de software',
    'Suporte e atendimento',
    'Implantação e treinamento',
    'Comercial',
    'Administrativo / Financeiro',
    'Estágio',
];

const PERKS = [
    { t: 'Produto com impacto real', d: 'O que você constrói é usado por servidores que executam o orçamento de municípios inteiros.' },
    { t: 'Time pequeno, decisão curta', d: 'Menos camada entre a ideia e a produção. Quem escreve o código acompanha o resultado na ponta.' },
    { t: 'Domínio que se aprende', d: 'Licitação, contrato e prestação de contas — um conhecimento que fica com você.' },
    { t: 'Base em Itabuna', d: 'Escritório no sul da Bahia, atendendo municípios de todo o estado.' },
];

const captcha = useRecaptcha();
const { verified, available } = captcha;
const { status, submit } = useFormSubmit(captcha.reset);
</script>

<template>
    <section class="tile tile--light hero" style="padding-bottom: var(--s-xl)">
        <div class="container container-narrow">
            <motion.span
                class="eyebrow"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: EASE_EXPO }"
            >
                Carreiras
            </motion.span>
            <h1 class="t-hero">
                <WordReveal text="Construa o sistema que" />{{ ' ' }}<em><WordReveal text="move o município." :delay="0.15" /></em>
            </h1>
            <motion.p
                class="t-lead hero-sub"
                style="max-width: 42ch"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 }"
            >
                Envie seu currículo. Guardamos seu perfil e chamamos quando abrir uma vaga aderente.
            </motion.p>
        </div>
    </section>

    <section class="tile tile--dark on-dark">
        <div class="container container-mid">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Por que aqui</span>
                    <h2 class="t-display">Um produto com endereço e consequência.</h2>
                </div>
            </Reveal>
            <Stagger class="grid grid-4" :stagger-children="0.07">
                <StaggerItem v-for="p in PERKS" :key="p.t">
                    <div class="util-card util-card--dark" style="height: 100%">
                        <h3>{{ p.t }}</h3>
                        <p>{{ p.d }}</p>
                    </div>
                </StaggerItem>
            </Stagger>
        </div>
    </section>

    <section class="tile tile--parchment">
        <div class="container container-narrow">
            <Reveal>
                <div class="tile-head">
                    <span class="eyebrow">Candidatura</span>
                    <h2 class="t-display">Envie seu currículo.</h2>
                </div>
            </Reveal>
            <Reveal :delay="0.08">
                <div class="util-card" style="padding: var(--s-xl)">
                    <motion.div
                        v-if="status === 'success'"
                        class="form-success"
                        :initial="{ opacity: 0, y: 16 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.6, ease: EASE_EXPO }"
                    >
                        <h3>Currículo recebido.</h3>
                        <p>Obrigado pelo interesse. A equipe da INFOCO entra em contato caso haja uma vaga aderente ao seu perfil.</p>
                    </motion.div>

                    <form v-else class="form" enctype="multipart/form-data" @submit="submit">
                        <input type="hidden" name="_origem" value="Site INFOCO — Trabalhe Conosco" />
                        <div class="form-row">
                            <div class="field">
                                <label for="nome">Nome completo</label>
                                <input id="nome" class="input" type="text" name="nome" required autocomplete="name" />
                            </div>
                            <div class="field">
                                <label for="area">Área de interesse</label>
                                <select id="area" class="select" name="area">
                                    <option v-for="a in AREAS" :key="a">{{ a }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="field">
                                <label for="email">E-mail</label>
                                <input id="email" class="input" type="email" name="email" required autocomplete="email" />
                            </div>
                            <div class="field">
                                <label for="telefone">Telefone ou WhatsApp</label>
                                <input id="telefone" class="input" type="tel" name="telefone" required autocomplete="tel" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="linkedin">LinkedIn, GitHub ou portfólio</label>
                            <input id="linkedin" class="input" type="url" name="linkedin" placeholder="https://" />
                        </div>
                        <div class="field">
                            <label for="curriculo">Currículo (PDF, DOC ou DOCX)</label>
                            <div class="file-drop">
                                Anexe o arquivo do seu currículo
                                <input
                                    id="curriculo"
                                    type="file"
                                    name="curriculo"
                                    accept=".pdf,.doc,.docx,application/pdf"
                                    required
                                />
                            </div>
                        </div>
                        <div class="field">
                            <label for="mensagem">Conte um pouco sobre você</label>
                            <textarea id="mensagem" class="textarea" name="mensagem" rows="5" />
                        </div>

                        <div class="recaptcha-slot">
                            <div ref="recaptcha" />
                        </div>
                        <p v-if="!available" class="form-error">
                            Não foi possível carregar a verificação de segurança. Recarregue a página ou
                            envie seu currículo por e-mail.
                        </p>

                        <button
                            type="submit"
                            class="btn btn-primary"
                            style="width: 100%"
                            :disabled="status === 'submitting' || !verified"
                        >
                            {{ status === 'submitting' ? 'Enviando…' : 'Enviar candidatura' }}
                        </button>

                        <p v-if="status === 'error'" class="form-error">
                            Não conseguimos enviar sua candidatura. Tente novamente ou escreva para
                            contato@infocogestaopublica.com.br.
                        </p>
                    </form>
                </div>
            </Reveal>
        </div>
    </section>
</template>
