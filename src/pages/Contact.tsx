import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaPhone, FaUserTie, FaHeadset, FaWhatsapp } from 'react-icons/fa';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

// Define grecaptcha on the window type to avoid TypeScript errors
declare global {
    interface Window {
        grecaptcha: any;
    }
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
};

const contactInfo = [
    {
        icon: <FaPhone />,
        title: 'Telefone',
        value: '(73) 3301-2710',
        href: 'tel:+557333012710'
    },
    {
        icon: <FaUserTie />,
        title: 'Administrativo',
        value: '(73) 98118-5210',
        href: 'https://wa.me/5573981185210'
    },
    {
        icon: <FaWhatsapp />,
        title: 'Comercial',
        value: '(71) 98205-3822',
        href: 'https://wa.me/5571982053822'
    },
    {
        icon: <FaHeadset />,
        title: 'Suporte Técnico',
        value: '(73) 98101-9313',
        href: 'https://wa.me/5573981019313'
    }
];

const ContactForm = () => {
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [isRecaptchaVerified, setRecaptchaVerified] = useState(false);
    const recaptchaContainer = useRef<HTMLDivElement>(null);
    const recaptchaWidgetId = useRef<number | null>(null);

     useEffect(() => {
        const renderRecaptcha = () => {
            if (recaptchaContainer.current && window.grecaptcha?.render && recaptchaWidgetId.current === null) {
                recaptchaWidgetId.current = window.grecaptcha.render(recaptchaContainer.current, {
                    'sitekey': '6Lewq7krAAAAAG6X-fKiZIAvAo53IKSNWAlMpyNn',
                    'callback': () => setRecaptchaVerified(true),
                    'expired-callback': () => setRecaptchaVerified(false),
                });
            }
        };

        const intervalId = setInterval(() => {
            if (window.grecaptcha && window.grecaptcha.render) {
                renderRecaptcha();
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus('submitting');
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://submit-form.com/Z4G5K3MOm', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                setSubmitStatus('success');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            setSubmitStatus('error');
            if (window.grecaptcha && recaptchaWidgetId.current !== null) {
                window.grecaptcha.reset(recaptchaWidgetId.current);
            }
            setRecaptchaVerified(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className="submit-success">
                <h3>Obrigado!</h3>
                <p>Sua mensagem foi enviada com sucesso. Retornaremos em breve.</p>
            </div>
        );
    }

    return (
        <div className="contact-container">
            <p className="section-subtitle">
                Tem alguma dúvida ou precisa de uma demonstração? Preencha o formulário abaixo e nossa equipe retornará em breve.
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome Completo</label>
                    <input type="text" id="nome" name="nome" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="telefone">Telefone / WhatsApp</label>
                    <input type="tel" id="telefone" name="telefone" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="mensagem">Sua Mensagem</label>
                    <textarea id="mensagem" name="mensagem" className="form-input" rows={5} required></textarea>
                </div>
                <div className="form-group recaptcha-container">
                    <div ref={recaptchaContainer}></div>
                </div>
                <button
                    type="submit"
                    className="cta-button"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={submitStatus === 'submitting' || !isRecaptchaVerified}
                >
                    {submitStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
                {submitStatus === 'error' && (
                    <p className="submit-error">
                        Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.
                    </p>
                )}
            </form>
        </div>
    );
};


const Contact = () => {
    return (
        <motion.section
            className="contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container contact-page-grid">
                <motion.div 
                    className="contact-info"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.h1 variants={itemVariants}>Entre em Contato</motion.h1>
                    <motion.p className="section-subtitle" variants={itemVariants}>
                        Estamos prontos para atender você. Escolha o melhor canal de comunicação ou nos envie uma mensagem.
                    </motion.p>
                    <div className="contact-cards-container">
                        {contactInfo.map((item, index) => (
                           <motion.a 
                                key={index} 
                                href={item.href} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-card" 
                                variants={itemVariants}
                            >
                                <div className="contact-card-icon">{item.icon}</div>
                                <div className="contact-card-content">
                                    <h3>{item.title}</h3>
                                    <span>{item.value}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
                <motion.div 
                    className="contact-form-wrapper"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <ContactForm />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Contact;
