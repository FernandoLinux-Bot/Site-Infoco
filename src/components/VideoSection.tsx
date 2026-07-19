import MuxPlayer from '@mux/mux-player-react';
import AnimatedSection from './AnimatedSection';

const VideoSection = () => {
    const muxPlaybackId = "8WgXwrn2oB7Yiz02D9hxvvReuNBZxqMQkshik9NZxVQE";

    return (
        <AnimatedSection id="video" className="video-section">
            <div className="container">
                <div className="video-section-head animated-item">
                    <div>
                        <span className="eyebrow">Vídeo / Apresentação</span>
                        <h2 className="section-title" style={{ marginTop: '1.5rem' }}>
                            Conheça <em>a INFOCO</em>.
                        </h2>
                    </div>
                    <p className="section-subtitle">
                        Em um minuto, veja como nossa plataforma transforma a gestão pública, da licitação à fiscalização.
                    </p>
                </div>
                <div className="video-player-frame animated-item" style={{ transitionDelay: '120ms' }}>
                    <MuxPlayer
                        playbackId={muxPlaybackId}
                        metadata={{ video_title: 'Apresentação INFOCO' }}
                        streamType="on-demand"
                        accentColor="#2253F0"
                    />
                </div>
            </div>
        </AnimatedSection>
    );
};

export default VideoSection;
