import React from 'react';
import MuxPlayer from '@mux/mux-player-react';
import AnimatedSection from './AnimatedSection';

const VideoSection = () => {
    // IMPORTANTE: Substitua 'YOUR_MUX_PLAYBACK_ID' pelo Playback ID
    // real do seu vídeo, que você pode encontrar no painel do Mux.
    const muxPlaybackId = "2P02m00i14qf229g12z01uhm0100d02IOX6GR00D9dGQSgV300aW19c";

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
                            viewer_user_id: 'user-id-1234', // Opcional: para analytics
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