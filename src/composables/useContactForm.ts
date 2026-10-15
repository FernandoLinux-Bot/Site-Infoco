import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';

/** Endpoint que entrega o formulário no e-mail da INFOCO. */
export const FORM_ENDPOINT = 'https://submit-form.com/Z4G5K3MOm';
const SITE_KEY = '6Lewq7krAAAAAG6X-fKiZIAvAo53IKSNWAlMpyNn';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

/**
 * Renderiza o widget do reCAPTCHA v2 no elemento com `ref="recaptcha"` e informa quando
 * o desafio foi resolvido. Desiste depois de 15s se o script não carregar,
 * em vez de deixar um intervalo rodando para sempre.
 */
export function useRecaptcha() {
    const container = useTemplateRef<HTMLDivElement>('recaptcha');
    let widgetId: number | null = null;
    const verified = ref(false);
    const available = ref(true);
    let id = 0;

    onMounted(() => {
        let attempts = 0;
        id = window.setInterval(() => {
            attempts += 1;
            if (window.grecaptcha?.render) {
                window.clearInterval(id);
                if (container.value && widgetId === null) {
                    widgetId = window.grecaptcha.render(container.value, {
                        sitekey: SITE_KEY,
                        callback: () => (verified.value = true),
                        'expired-callback': () => (verified.value = false),
                        'error-callback': () => (verified.value = false),
                    });
                }
            } else if (attempts > 150) {
                window.clearInterval(id);
                available.value = false;
            }
        }, 100);
    });
    onBeforeUnmount(() => window.clearInterval(id));

    const reset = () => {
        if (window.grecaptcha && widgetId !== null) {
            window.grecaptcha.reset(widgetId);
        }
        verified.value = false;
    };

    return { verified, available, reset };
}

/** Envia o FormData para o endpoint e devolve o estado do envio. */
export function useFormSubmit(onReset?: () => void) {
    const status = ref<SubmitStatus>('idle');

    const submit = async (event: Event) => {
        event.preventDefault();
        status.value = 'submitting';
        const data = new FormData(event.currentTarget as HTMLFormElement);
        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            status.value = 'success';
        } catch (error) {
            console.error('Falha ao enviar o formulário:', error);
            status.value = 'error';
            onReset?.();
        }
    };

    return { status, submit };
}
