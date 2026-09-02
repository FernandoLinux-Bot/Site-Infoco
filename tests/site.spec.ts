import { test, expect, type Page } from '@playwright/test';

/** Todas as rotas do site e o que prova que cada uma renderizou. */
const ROTAS = [
    { path: '/', titulo: /Do plano anual ao contrato assinado/i },
    { path: '/sicc', titulo: /Sistema Integrado de/i },
    { path: '/solucoes', titulo: /módulos\./i },
    { path: '/institucional', titulo: /Software para quem responde/i },
    { path: '/fornecedor', titulo: /Venda para o poder público/i },
    { path: '/cadastro', titulo: /Solicite seu/i },
    { path: '/contato', titulo: /Fale com a/i },
    { path: '/noticias', titulo: /O que a INFOCO/i },
    { path: '/trabalhe-conosco', titulo: /Construa o sistema que/i },
];

/** Coleta erros de console e falhas de rede para checagem no fim do teste. */
function watchErrors(page: Page) {
    const errors: string[] = [];
    page.on('console', m => {
        if (m.type() !== 'error') return;
        const t = m.text();
        // Ruído esperado fora da Vercel e sem rede: os scripts de analytics e de
        // fontes só existem em produção, e o reCAPTCHA não carrega em headless.
        if (/recaptcha|gstatic|googleapis|_vercel|ERR_BLOCKED|Failed to load resource/i.test(t)) return;
        errors.push(t);
    });
    page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
    return errors;
}

test.describe('Rotas', () => {
    for (const rota of ROTAS) {
        test(`${rota.path} renderiza sem erro de JS`, async ({ page }) => {
            const errors = watchErrors(page);
            const resp = await page.goto(rota.path);
            expect(resp?.status(), `status de ${rota.path}`).toBeLessThan(400);

            await expect(page.locator('h1')).toContainText(rota.titulo);
            await expect(page.locator('header.global-nav')).toBeVisible();
            await expect(page.locator('footer.site-footer')).toBeVisible();

            expect(errors, `erros de console em ${rota.path}`).toEqual([]);
        });
    }

    test('rota inexistente devolve a página 404, não a Home', async ({ page }) => {
        await page.goto('/rota-que-nao-existe');
        await expect(page.locator('h1')).toContainText(/não existe/i);
        await expect(page.getByText('Erro 404')).toBeVisible();
    });
});

test.describe('Navegação', () => {
    test('CTA persistente aponta para a plataforma externa', async ({ page }) => {
        await page.goto('/');
        const cta = page.locator('.sub-nav-right a.btn-primary');
        await expect(cta).toHaveAttribute('href', 'https://faq.infocogestaopublica.com.br');
        await expect(cta).toHaveAttribute('target', '_blank');
        await expect(cta).toHaveAttribute('rel', /noopener/);
    });

    test('toda rota do App é alcançável pela navegação visível', async ({ page, isMobile }) => {
        await page.goto('/');
        if (isMobile) {
            await page.locator('.hamburger').click();
            await expect(page.locator('.mobile-sheet')).toBeVisible();
        }
        // No mobile o menu cobre a navegação principal; o rodapé segue alcançável rolando.
        const escopo = isMobile
            ? '.mobile-sheet, footer.site-footer'
            : 'header.global-nav, footer.site-footer';
        for (const rota of ROTAS) {
            const link = page.locator(`${escopo} a[href="${rota.path}"]`).first();
            await expect(link, `link visível para ${rota.path}`).toHaveCount(1);
        }
    });

    test('âncora /sicc#fluxo rola até a seção', async ({ page }) => {
        await page.goto('/sicc#fluxo');
        const alvo = page.locator('#fluxo');
        await expect(alvo).toBeVisible();
        await page.waitForTimeout(900);
        const box = await alvo.boundingBox();
        expect(box!.y).toBeLessThan(400);
    });
});

test.describe('Formulários', () => {
    const forms = [
        { path: '/contato', campos: ['nome', 'email', 'mensagem'] },
        { path: '/cadastro', campos: ['nome', 'organizacao', 'municipio', 'email', 'telefone'] },
        { path: '/trabalhe-conosco', campos: ['nome', 'email', 'telefone', 'curriculo'] },
    ];

    for (const f of forms) {
        test(`${f.path} tem os campos e o envio bloqueado sem reCAPTCHA`, async ({ page }) => {
            await page.goto(f.path);
            for (const campo of f.campos) {
                await expect(page.locator(`[name="${campo}"]`), `campo ${campo}`).toHaveCount(1);
            }
            const submit = page.locator('form button[type="submit"]');
            await expect(submit).toBeDisabled();
        });

        test(`${f.path} envia o payload correto e mostra a confirmação`, async ({ page }) => {
            // Finge um reCAPTCHA resolvido para liberar o botão sem chamar o Google.
            await page.addInitScript(() => {
                (window as any).grecaptcha = {
                    render: (_el: unknown, opts: { callback?: () => void }) => {
                        setTimeout(() => opts.callback?.(), 0);
                        return 1;
                    },
                    reset: () => {},
                };
            });

            let payload: Record<string, string> | null = null;
            await page.route('https://submit-form.com/**', async route => {
                const post = route.request().postData() ?? '';
                payload = Object.fromEntries(
                    post
                        .split(/\r?\n/)
                        .join('\n')
                        .split('name="')
                        .slice(1)
                        .map(bloco => {
                            const nome = bloco.slice(0, bloco.indexOf('"'));
                            const valor = bloco.split('\n\n')[1]?.split('\n')[0] ?? '';
                            return [nome, valor.trim()];
                        })
                );
                await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
            });

            await page.goto(f.path);
            await page.fill('[name="nome"]', 'Fulano de Teste');
            await page.fill('[name="email"]', 'teste@exemplo.gov.br');
            for (const extra of ['telefone', 'organizacao', 'municipio']) {
                const campo = page.locator(`[name="${extra}"]`);
                if (await campo.count()) await campo.fill('Teste');
            }
            const mensagem = page.locator('[name="mensagem"]');
            if (await mensagem.count()) await mensagem.fill('Mensagem automatizada de teste.');
            const arquivo = page.locator('[name="curriculo"]');
            if (await arquivo.count()) {
                await arquivo.setInputFiles({
                    name: 'curriculo.pdf',
                    mimeType: 'application/pdf',
                    buffer: Buffer.from('%PDF-1.4 teste'),
                });
            }

            const submit = page.locator('form button[type="submit"]');
            await expect(submit).toBeEnabled({ timeout: 10_000 });
            await submit.click();

            await expect(page.locator('.form-success')).toBeVisible({ timeout: 10_000 });
            expect(payload, 'o POST precisa sair').not.toBeNull();
            expect(payload!._origem, 'origem identifica de qual formulário veio').toContain('INFOCO');
            expect(payload!.nome).toBe('Fulano de Teste');
            expect(payload!.email).toBe('teste@exemplo.gov.br');
        });
    }

    test('cadastro não pede nem envia senha', async ({ page }) => {
        await page.goto('/cadastro');
        await expect(page.locator('input[type="password"]')).toHaveCount(0);
        await expect(page.locator('[name*="senha" i]')).toHaveCount(0);
    });
});

test.describe('Design system', () => {
    test('usa um único azul de ação e a paleta do spec', async ({ page }) => {
        await page.goto('/');
        const vars = await page.evaluate(() => {
            const s = getComputedStyle(document.documentElement);
            return {
                primary: s.getPropertyValue('--primary').trim(),
                focus: s.getPropertyValue('--primary-focus').trim(),
                onDark: s.getPropertyValue('--primary-on-dark').trim(),
                ink: s.getPropertyValue('--ink').trim(),
                parchment: s.getPropertyValue('--canvas-parchment').trim(),
            };
        });
        expect(vars).toEqual({
            primary: '#0066cc',
            focus: '#0071e3',
            onDark: '#2997ff',
            ink: '#1d1d1f',
            parchment: '#f4f6f9',
        });
    });

    test('as superfícies escuras são navy, não cinza neutro', async ({ page }) => {
        await page.goto('/');
        const tiles = await page.evaluate(() => {
            const s = getComputedStyle(document.documentElement);
            return ['--surface-tile-1', '--surface-tile-2', '--surface-tile-3', '--surface-black']
                .map(n => s.getPropertyValue(n).trim());
        });
        expect(tiles).toEqual(['#1e2a3b', '#223040', '#1a2534', '#0d141d']);
        // Navy de verdade: o canal azul precisa superar o vermelho em cada tile.
        for (const hex of tiles) {
            const r = parseInt(hex.slice(1, 3), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            expect(b, `${hex} deveria puxar para o azul`).toBeGreaterThan(r);
        }
    });

    test('corpo do texto roda em 17px, não 16px', async ({ page }) => {
        await page.goto('/');
        const size = await page.evaluate(() => getComputedStyle(document.body).fontSize);
        expect(size).toBe('17px');
    });

    test('CTA primário é uma pílula', async ({ page }) => {
        await page.goto('/');
        const r = await page.locator('.btn-primary').first().evaluate(el => getComputedStyle(el).borderRadius);
        expect(parseFloat(r)).toBeGreaterThan(50);
    });

    test('nenhum gradiente decorativo de fundo', async ({ page }) => {
        await page.goto('/');
        const comGradiente = await page.evaluate(() =>
            Array.from(document.querySelectorAll('*')).filter(el => {
                const bg = getComputedStyle(el).backgroundImage;
                return bg.includes('gradient') && !bg.includes('data:');
            }).length
        );
        expect(comGradiente).toBe(0);
    });

    test('a única sombra do sistema está no produto, não no chrome', async ({ page }) => {
        await page.goto('/');
        const comBoxShadow = await page.evaluate(() =>
            Array.from(document.querySelectorAll('.btn, .util-card, .global-nav, .sub-nav, .site-footer'))
                .filter(el => getComputedStyle(el).boxShadow !== 'none').length
        );
        expect(comBoxShadow).toBe(0);
        const painel = await page.locator('.sicc-panel').evaluate(el => getComputedStyle(el).filter);
        expect(painel).toContain('drop-shadow');
    });

    test('tiles alternam entre claro e escuro', async ({ page }) => {
        await page.goto('/');
        const fundos = await page.locator('.tile').evaluateAll(els =>
            els.map(el => getComputedStyle(el).backgroundColor)
        );
        expect(new Set(fundos).size).toBeGreaterThan(1);
    });
});

test.describe('Acessibilidade e responsivo', () => {
    test('cada página tem exatamente um h1', async ({ page }) => {
        for (const rota of ROTAS) {
            await page.goto(rota.path);
            await expect(page.locator('h1'), `h1 em ${rota.path}`).toHaveCount(1);
        }
    });

    test('todas as imagens têm alt', async ({ page }) => {
        await page.goto('/');
        const semAlt = await page.locator('img:not([alt])').count();
        expect(semAlt).toBe(0);
    });

    test('controles sem texto têm aria-label', async ({ page }) => {
        await page.goto('/');
        const semLabel = await page.evaluate(() =>
            Array.from(document.querySelectorAll('button, a')).filter(el => {
                const texto = (el.textContent || '').trim();
                return !texto && !el.getAttribute('aria-label') && !el.getAttribute('aria-hidden');
            }).length
        );
        expect(semLabel).toBe(0);
    });

    test('não há rolagem horizontal', async ({ page }) => {
        for (const rota of ROTAS) {
            await page.goto(rota.path);
            const overflow = await page.evaluate(() =>
                document.documentElement.scrollWidth - document.documentElement.clientWidth
            );
            expect(overflow, `overflow horizontal em ${rota.path}`).toBeLessThanOrEqual(1);
        }
    });

    test('alvos de toque têm ao menos 44px', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'só faz sentido no viewport de toque');
        await page.goto('/');
        const pequenos = await page.locator('.btn-primary, .float-btn').evaluateAll(els =>
            els.filter(el => el.getBoundingClientRect().height < 44).length
        );
        expect(pequenos).toBe(0);
    });

    test('menu mobile abre, trava a rolagem e fecha', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'o hamburger só existe abaixo de 833px');
        await page.goto('/');
        await page.locator('.hamburger').click();
        await expect(page.locator('.mobile-sheet')).toBeVisible();
        await expect(page.locator('body')).toHaveClass(/nav-open/);
        await page.locator('.hamburger').click();
        await expect(page.locator('.mobile-sheet')).toHaveCount(0);
        await expect(page.locator('body')).not.toHaveClass(/nav-open/);
    });
});

test.describe('Conteúdo do SICC', () => {
    test('o fluxo mostra as seis fases da demanda', async ({ page }) => {
        await page.goto('/sicc');
        await expect(page.locator('.flow-step')).toHaveCount(6);
        for (const fase of ['Elaboração', 'Análises', 'Cotação', 'Mapa de Riscos', 'Autoridade', 'Contratação']) {
            await expect(page.locator('.flow-step h3', { hasText: fase })).toHaveCount(1);
        }
    });

    test('o acordeão de perguntas abre e fecha', async ({ page }) => {
        await page.goto('/sicc#perguntas');
        const primeira = page.locator('.faq-item').first();
        await expect(primeira).toHaveClass(/is-open/);
        await primeira.locator('.faq-q').click();
        await expect(primeira).not.toHaveClass(/is-open/);
        const segunda = page.locator('.faq-item').nth(1);
        await segunda.locator('.faq-q').click();
        await expect(segunda.locator('.faq-a')).toBeVisible();
    });

    test('o filtro de módulos reduz a lista', async ({ page }) => {
        await page.goto('/solucoes');
        const total = await page.locator('.util-card[id]').count();
        expect(total).toBeGreaterThan(10);
        // A manchete anuncia a quantidade: ela não pode divergir dos cartões.
        await expect(page.locator('h1')).toContainText(String(total));
        await page.getByRole('tab', { name: 'Execução' }).click();
        await page.waitForTimeout(600);
        const filtrado = await page.locator('.util-card[id]').count();
        expect(filtrado).toBeGreaterThan(0);
        expect(filtrado).toBeLessThan(total);
    });

    test('a Lei 14.133/2021 é citada nos módulos com fundamento legal', async ({ page }) => {
        await page.goto('/solucoes');
        await expect(page.getByText(/Lei 14\.133\/2021/).first()).toBeVisible();
    });

    test('a carteira completa de clientes não é exposta', async ({ page }) => {
        // O FAQ do SICC trata a lista de municípios como informação comercial restrita.
        await page.goto('/');
        const brasoes = await page.locator('.client-strip img').count();
        expect(brasoes).toBeLessThanOrEqual(7);
    });
});
