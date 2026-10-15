<script setup lang="ts">
import { motion } from 'motion-v';
import { EASE_EXPO, Reveal, WordReveal } from '../components/motion';
import { useFormSubmit, useRecaptcha } from '../composables/useContactForm';
import { SISTEMA } from '../data/links';

const TIPOS = [
    'Prefeitura Municipal',
    'Câmara Municipal',
    'Consórcio Público',
    'Fornecedor / Empresa',
    'Outro',
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
                Cadastro
            </motion.span>
            <h1 class="t-hero">
                <WordReveal text="Solicite seu" />{{ ' ' }}<em><WordReveal text="acesso." :delay="0.12" /></em>
            </h1>
            <motion.p
                class="t-lead hero-sub"
                style="max-width: 40ch"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 }"
            >
                Preencha os dados da organização e a INFOCO conclui a habilitação do acesso ao SICC.
            </motion.p>
        </div>
    </section>

    <section class="tile tile--parchment" style="padding-top: var(--s-xl)">
        <div class="container container-narrow">
            <Reveal>
                <div class="util-card" style="padding: var(--s-xl)">
                    <motion.div
                        v-if="status === 'success'"
                        class="form-success"
                        :initial="{ opacity: 0, y: 16 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.6, ease: EASE_EXPO }"
                    >
                        <h3>Solicitação recebida.</h3>
                        <p>
                            A INFOCO vai conferir os dados e entrar em contato para concluir a criação
                            do acesso. Nenhuma senha é definida por aqui.
                        </p>
                    </motion.div>

                    <form v-else class="form" @submit="submit">
                        <input type="hidden" name="_origem" value="Site INFOCO — Solicitação de cadastro" />
                        <div class="form-row">
                            <div class="field">
                                <label for="nome">Nome completo</label>
                                <input id="nome" class="input" type="text" name="nome" required autocomplete="name" />
                            </div>
                            <div class="field">
                                <label for="cargo">Cargo ou função</label>
                                <input id="cargo" class="input" type="text" name="cargo" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="field">
                                <label for="tipo">Tipo de organização</label>
                                <select id="tipo" class="select" name="tipo">
                                    <option v-for="t in TIPOS" :key="t">{{ t }}</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="organizacao">Nome da organização</label>
                                <input id="organizacao" class="input" type="text" name="organizacao" required autocomplete="organization" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="field">
                                <label for="municipio">Município / UF</label>
                                <input id="municipio" class="input" type="text" name="municipio" required />
                            </div>
                            <div class="field">
                                <label for="documento">CNPJ</label>
                                <input id="documento" class="input" type="text" name="documento" inputmode="numeric" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="field">
                                <label for="email">E-mail institucional</label>
                                <input id="email" class="input" type="email" name="email" required autocomplete="email" />
                            </div>
                            <div class="field">
                                <label for="telefone">Telefone ou WhatsApp</label>
                                <input id="telefone" class="input" type="tel" name="telefone" required autocomplete="tel" />
                            </div>
                        </div>
                        <div class="field">
                            <label for="observacoes">Observações</label>
                            <textarea id="observacoes" class="textarea" name="observacoes" rows="5" />
                        </div>

                        <div class="recaptcha-slot">
                            <div ref="recaptcha" />
                        </div>
                        <p v-if="!available" class="form-error">
                            Não foi possível carregar a verificação de segurança. Recarregue a página ou
                            fale conosco pelo WhatsApp.
                        </p>

                        <button
                            type="submit"
                            class="btn btn-primary"
                            style="width: 100%"
                            :disabled="status === 'submitting' || !verified"
                        >
                            {{ status === 'submitting' ? 'Enviando…' : 'Enviar solicitação' }}
                        </button>

                        <p v-if="status === 'error'" class="form-error">
                            Não conseguimos enviar a solicitação. Tente novamente ou fale conosco pelo WhatsApp.
                        </p>
                        <p class="form-note">
                            Este formulário registra uma solicitação de cadastro. A criação do acesso é
                            concluída pela INFOCO — nenhuma senha trafega por aqui.
                        </p>
                    </form>
                </div>
            </Reveal>
            <Reveal :delay="0.08">
                <p class="t-caption" style="margin-top: var(--s-lg); text-align: center; color: var(--ink-muted-48)">
                    Já tem conta? <a :href="SISTEMA" target="_blank" rel="noopener noreferrer">Acesse o sistema</a> · Dúvidas? <RouterLink to="/contato">Fale com a INFOCO</RouterLink>
                </p>
            </Reveal>
        </div>
    </section>
</template>
