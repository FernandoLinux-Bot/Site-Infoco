import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Reveal } from './motion';

/** O player pesa mais que todo o resto do site — só entra quando a seção aparece. */
const MuxPlayer = lazy(() => import('@mux/mux-player-react'));

const PLAYBACK_ID = '8WgXwrn2oB7Yiz02D9hxvvReuNBZxqMQkshik9NZxVQE';

const VideoSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver(
            entries => {
                if (entries.some(e => e.isIntersecting)) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { rootMargin: '320px' }
        );
        io.observe(node);
        return () => io.disconnect();
    }, []);

    return (
        <section className="tile tile--black on-dark">
            <div className="container container-mid">
                <Reveal>
                    <div className="tile-head">
                        <span className="eyebrow">Em movimento</span>
                        <h2 className="t-display">Veja o sistema por dentro.</h2>
                        <p className="t-body">
                            Uma volta pelo SICC: como uma demanda nasce, tramita e vira contrato.
                        </p>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="media-frame" ref={ref} style={{ aspectRatio: '16 / 9' }}>
                        {visible && (
                            <Suspense fallback={null}>
                                <MuxPlayer
                                    streamType="on-demand"
                                    playbackId={PLAYBACK_ID}
                                    metadata={{ video_title: 'INFOCO — SICC' }}
                                    accentColor="#0071e3"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </Suspense>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default VideoSection;
