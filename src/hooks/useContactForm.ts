import { useCallback, useEffect, useRef, useState } from 'react';

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
 * Renderiza o widget do reCAPTCHA v2 no container devolvido e informa quando
 * o desafio foi resolvido. Desiste depois de 15s se o script não carregar,
 * em vez de deixar um intervalo rodando para sempre.
 */
export function useRecaptcha() {
    const container = useRef<HTMLDivElement>(null);
    const widgetId = useRef<number | null>(null);
    const [verified, setVerified] = useState(false);
    const [available, setAvailable] = useState(true);

    useEffect(() => {
        let attempts = 0;
        const id = window.setInterval(() => {
            attempts += 1;
            if (window.grecaptcha?.render) {
                window.clearInterval(id);
                if (container.current && widgetId.current === null) {
                    widgetId.current = window.grecaptcha.render(container.current, {
                        sitekey: SITE_KEY,
                        callback: () => setVerified(true),
                        'expired-callback': () => setVerified(false),
                        'error-callback': () => setVerified(false),
                    });
                }
            } else if (attempts > 150) {
                window.clearInterval(id);
                setAvailable(false);
            }
        }, 100);
        return () => window.clearInterval(id);
    }, []);

    const reset = useCallback(() => {
        if (window.grecaptcha && widgetId.current !== null) {
            window.grecaptcha.reset(widgetId.current);
        }
        setVerified(false);
    }, []);

    return { container, verified, available, reset };
}

/** Envia o FormData para o endpoint e devolve o estado do envio. */
export function useFormSubmit(onReset?: () => void) {
    const [status, setStatus] = useState<SubmitStatus>('idle');

    const submit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setStatus('submitting');
            const data = new FormData(event.currentTarget);
            try {
                const response = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    body: data,
                    headers: { Accept: 'application/json' },
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                setStatus('success');
            } catch (error) {
                console.error('Falha ao enviar o formulário:', error);
                setStatus('error');
                onReset?.();
            }
        },
        [onReset]
    );

    return { status, submit };
}
