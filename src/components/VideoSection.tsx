import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { Reveal } from './motion';
import { VIDEOS_PUBLICADOS, type Video } from '../data/videos';

/** O player pesa mais que todo o resto do site — só entra quando a seção aparece. */
const MuxPlayer = lazy(() => import('@mux/mux-player-react'));

/** Capa na proporção nativa 9:16, em densidade suficiente para telas retina. */
const poster = (v: Video) =>
    `https://image.mux.com/${v.id}/thumbnail.webp?width=810&height=1440&fit_mode=preserve&time=${v.posterEm}`;

const Cartao = ({ video, ativo, carregar }: { video: Video; ativo: boolean; carregar: boolean }) => (
    <article className="video-card" aria-roledescription="slide" aria-label={video.titulo}>
        <div className="video-frame">
            {carregar ? (
                <Suspense fallback={<img src={poster(video)} alt="" aria-hidden="true" />}>
                    <MuxPlayer
                        streamType="on-demand"
                        playbackId={video.id}
                        poster={poster(video)}
                        metadata={{ video_title: video.titulo }}
                        accentColor="#0071e3"
                        // `preload` só no slide visível: dois players buscando
                        // manifesto ao mesmo tempo atrasa o que a pessoa vai ver.
                        preload={ativo ? 'metadata' : 'none'}
                    />
                </Suspense>
            ) : (
                <img src={poster(video)} alt="" aria-hidden="true" loading="lazy" />
            )}
        </div>
        <div className="video-legenda">
            <h3>{video.titulo}</h3>
            <p>{video.descricao}</p>
        </div>
    </article>
);

const VideoSection = () => {
    const secao = useRef<HTMLDivElement>(null);
    const trilho = useRef<HTMLDivElement>(null);
    const [carregar, setCarregar] = useState(false);
    const [atual, setAtual] = useState(0);

    const total = VIDEOS_PUBLICADOS.length;

    useEffect(() => {
        const node = secao.current;
        if (!node) return;
        const io = new IntersectionObserver(
            entries => {
                if (entries.some(e => e.isIntersecting)) {
                    setCarregar(true);
                    io.disconnect();
                }
            },
            { rootMargin: '320px' }
        );
        io.observe(node);
        return () => io.disconnect();
    }, []);

    // O slide ativo vem da rolagem real do trilho, então arrastar com o dedo e
    // clicar nas setas mantêm o indicador coerente.
    const aoRolar = useCallback(() => {
        const el = trilho.current;
        if (!el) return;
        const largura = el.clientWidth;
        if (!largura) return;
        setAtual(Math.round(el.scrollLeft / largura));
    }, []);

    const irPara = useCallback((i: number) => {
        const el = trilho.current;
        if (!el) return;
        const alvo = Math.max(0, Math.min(i, total - 1));
        el.scrollTo({ left: alvo * el.clientWidth, behavior: 'smooth' });
    }, [total]);

    if (total === 0) return null;

    return (
        <section className="tile tile--black on-dark" ref={secao}>
            <div className="container container-mid">
                <Reveal>
                    <div className="tile-head">
                        <span className="eyebrow">Em movimento</span>
                        <h2 className="t-display">Veja o sistema por dentro.</h2>
                        <p className="t-body">
                            Conversas curtas sobre como o SICC conduz o planejamento e a contratação.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="video-carrossel">
                        <div
                            className="video-trilho"
                            ref={trilho}
                            onScroll={aoRolar}
                            tabIndex={0}
                            role="group"
                            aria-roledescription="carrossel"
                            aria-label="Vídeos sobre o SICC"
                        >
                            {VIDEOS_PUBLICADOS.map((v, i) => (
                                <Cartao key={v.id} video={v} ativo={i === atual} carregar={carregar} />
                            ))}
                        </div>

                        {total > 1 && (
                            <>
                                <button
                                    className="video-seta video-seta--ant"
                                    onClick={() => irPara(atual - 1)}
                                    disabled={atual === 0}
                                    aria-label="Vídeo anterior"
                                >
                                    ‹
                                </button>
                                <button
                                    className="video-seta video-seta--prox"
                                    onClick={() => irPara(atual + 1)}
                                    disabled={atual === total - 1}
                                    aria-label="Próximo vídeo"
                                >
                                    ›
                                </button>
                                <div className="video-pontos" role="tablist" aria-label="Escolher vídeo">
                                    {VIDEOS_PUBLICADOS.map((v, i) => (
                                        <button
                                            key={v.id}
                                            role="tab"
                                            aria-selected={i === atual}
                                            aria-label={v.titulo}
                                            className={`video-ponto${i === atual ? ' is-active' : ''}`}
                                            onClick={() => irPara(i)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default VideoSection;
