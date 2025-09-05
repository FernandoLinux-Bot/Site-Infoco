import React from 'react';
import MuxPlayer from '@mux/mux-player-react';
import AnimatedSection from './AnimatedSection';

const VideoSection = () => {
    // O Playback ID do seu vídeo foi atualizado.
    const muxPlaybackId = "FPT9OkUxOEs02S79RkBWYebul02Ayawrfblpm8skPFW2g";

    return (
        <AnimatedSection id="video" className="video-section">
            <div className="container">
                <h2 className="section-title animated-item">Conheça a INFOCO</h2>
                <p className="section-subtitle animated-item" style={{ transitionDelay: '100ms' }}>
                    Veja em um minuto como nossa plataforma pode transformar a gestão pública.
                </p>
                <div className="video-player-container animated-item" style={{ transitionDelay: '200ms' }}>
                    <MuxPlayer
                        playbackId={muxPlaybackId}
                        metadata={{
                            video_title: 'Apresentação INFOCO',
                            viewer_user_id: 'user-id-infoco-site', // Opcional: para analytics
                        }}
                        streamType="on-demand"
                        accentColor="#007BFF" // Cor de destaque do player
                    />
                </div>
            </div>
        </AnimatedSection>
    );
};

export default VideoSection;
