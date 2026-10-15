<script setup lang="ts">
import { CONHECER, SISTEMA } from '../data/links';

const ANO = new Date().getFullYear();
</script>

<template>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col footer-brand">
                    <img src="/logo-infoco.png" alt="INFOCO Gestão Pública" width="148" height="47" loading="lazy" />
                    <p>
                        Software de gestão pública para prefeituras, câmaras e consórcios.
                        O SICC cobre o ciclo inteiro da contratação sob a Lei 14.133/2021.
                    </p>
                </div>

                <div class="footer-col">
                    <h4>Produto</h4>
                    <RouterLink to="/sicc">O SICC</RouterLink>
                    <RouterLink to="/solucoes">Módulos</RouterLink>
                    <RouterLink to="/sicc#fluxo">Fluxo da contratação</RouterLink>
                    <RouterLink to="/sicc#perguntas">Perguntas frequentes</RouterLink>
                    <a :href="CONHECER" target="_blank" rel="noopener noreferrer">Conhecer o sistema</a>
                    <a :href="SISTEMA" target="_blank" rel="noopener noreferrer">Central de Ajuda</a>
                </div>

                <div class="footer-col">
                    <h4>Institucional</h4>
                    <RouterLink to="/institucional">Quem somos</RouterLink>
                    <RouterLink to="/noticias">Notícias</RouterLink>
                    <RouterLink to="/fornecedor">Para fornecedores</RouterLink>
                    <RouterLink to="/trabalhe-conosco">Trabalhe conosco</RouterLink>
                    <RouterLink to="/cadastro">Solicitar cadastro</RouterLink>
                </div>

                <div class="footer-col">
                    <h4>Contato</h4>
                    <a href="tel:+557333012710">(73) 3301-2710</a>
                    <a href="https://wa.me/5573981185210" target="_blank" rel="noopener noreferrer">Administrativo</a>
                    <a href="https://wa.me/5571982053822" target="_blank" rel="noopener noreferrer">Comercial</a>
                    <a href="https://wa.me/5573981019313" target="_blank" rel="noopener noreferrer">Suporte</a>
                    <a href="mailto:contato@infocogestaopublica.com.br">contato@infocogestaopublica.com.br</a>
                </div>
            </div>

            <div class="footer-legal">
                <span>
                    Av. Princesa Isabel, 1206 — 2º andar, salas 201/202, São Caetano, Itabuna/BA, 45607-127
                </span>
                <span>
                    © {{ ANO }} INFOCO Gestão Pública Ltda. — CNPJ 46.554.439/0001-67
                </span>
            </div>
        </div>
    </footer>
</template>
