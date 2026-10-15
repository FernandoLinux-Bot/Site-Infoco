<script setup lang="ts">
import { motion } from 'motion-v';
import { EASE_EXPO, Reveal, Stagger, StaggerItem, WordReveal } from '../components/motion';
import { useFormSubmit, useRecaptcha } from '../composables/useContactForm';

const CANAIS = [
    { t: 'Telefone fixo', v: '(73) 3301-2710', href: 'tel:+557333012710' },
    { t: 'Administrativo', v: '(73) 98118-5210', href: 'https://wa.me/5573981185210' },
    { t: 'Comercial', v: '(71) 98205-3822', href: 'https://wa.me/5571982053822' },
    { t: 'Suporte técnico', v: '(73) 98101-9313', href: 'https://wa.me/5573981019313' },
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
                Contato
            </motion.span>
            <h1 class="t-hero">
                <WordReveal text="Fale com a" />{{ ' ' }}<em><WordReveal text="INFOCO." :delay="0.12" /></em>
            </h1>
            <motion.p
                class="t-lead hero-sub"
                :initial="{ opacity: 0, y: 16 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, ease: EASE_EXPO, delay: 0.35 }"
            >
                Escolha um canal direto ou envie uma mensagem pelo formulário.
            </motion.p>
        </div>
    </section>

    <section class="tile tile--parchment" style="padding-top: var(--s-xl)">
        <div class="container container-mid">
            <div class="split split--wide" style="align-items: start">
                <div>
                    <Reveal>
                        <h2 class="t-display-md">Canais diretos</h2>
                    </Reveal>
                    <Stagger class="grid" :stagger-children="0.06">
                        <StaggerItem v-for="c in CANAIS" :key="c.t">
                            <a
                                class="util-card"
                                :href="c.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                style="text-decoration: none; color: inherit"
                            >
                                <span class="card-index">{{ c.t }}</span>
                                <h3>{{ c.v }}</h3>
                            </a>
                        </StaggerItem>
                    </Stagger>

                    <Reveal :delay="0.1">
                        <div class="util-card" style="margin-top: var(--s-lg)">
                            <span class="card-index">Endereço</span>
                            <p>
                                Av. Princesa Isabel, 1206 — 2º andar, salas 201/202<br />
                                São Caetano, Itabuna/BA — 45607-127
                            </p>
                            <p>
                                <a href="mailto:contato@infocogestaopublica.com.br">contato@infocogestaopublica.com.br</a>
                            </p>
                        </div>
                    </Reveal>
                </div>

                <Reveal :delay="0.08">
                    <div class="util-card" style="padding: var(--s-xl)">
                        <h2 class="t-display-md" style="margin-bottom: var(--s-md)">
                            Enviar mensagem
                        </h2>
                        <motion.div
                            v-if="status === 'success'"
                            class="form-success"
                            :initial="{ opacity: 0, y: 16 }"
                            :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.6, ease: EASE_EXPO }"
                        >
                            <h3>Mensagem enviada.</h3>
                            <p>Obrigado pelo contato. A equipe da INFOCO responde em breve.</p>
                        </motion.div>

                        <form v-else class="form" @submit="submit">
                            <input type="hidden" name="_origem" value="Site INFOCO — Contato" />
                            <div class="form-row">
                                <div class="field">
                                    <label for="nome">Nome completo</label>
                                    <input id="nome" class="input" type="text" name="nome" required autocomplete="name" />
                                </div>
                                <div class="field">
                                    <label for="orgao">Órgão ou empresa</label>
                                    <input id="orgao" class="input" type="text" name="orgao" autocomplete="organization" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="field">
                                    <label for="email">E-mail</label>
                                    <input id="email" class="input" type="email" name="email" required autocomplete="email" />
                                </div>
                                <div class="field">
                                    <label for="telefone">Telefone ou WhatsApp</label>
                                    <input id="telefone" class="input" type="tel" name="telefone" autocomplete="tel" />
                                </div>
                            </div>
                            <div class="field">
                                <label for="assunto">Assunto</label>
                                <select id="assunto" class="select" name="assunto">
                                    <option>Conhecer o SICC</option>
                                    <option>Implantação em um município</option>
                                    <option>Suporte técnico</option>
                                    <option>Sou fornecedor</option>
                                    <option>Outro assunto</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="mensagem">Mensagem</label>
                                <textarea id="mensagem" class="textarea" name="mensagem" rows="6" required />
                            </div>

                            <div class="recaptcha-slot">
                                <div ref="recaptcha" />
                            </div>
                            <p v-if="!available" class="form-error">
                                Não foi possível carregar a verificação de segurança. Recarregue a página ou fale
                                conosco pelo WhatsApp.
                            </p>

                            <button
                                type="submit"
                                class="btn btn-primary"
                                style="width: 100%"
                                :disabled="status === 'submitting' || !verified"
                            >
                                {{ status === 'submitting' ? 'Enviando…' : 'Enviar mensagem' }}
                            </button>

                            <p v-if="status === 'error'" class="form-error">
                                Não conseguimos enviar sua mensagem. Tente novamente ou use um dos canais ao lado.
                            </p>
                            <p class="form-note">
                                Os dados enviados são usados apenas para responder ao seu contato.
                            </p>
                        </form>
                    </div>
                </Reveal>
            </div>
        </div>
    </section>
</template>
