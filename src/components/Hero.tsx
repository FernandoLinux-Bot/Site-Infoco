import React from 'react';

const Hero = () => (
    <div className="banner-container">
        <div className="floating-elements">
            <div className="floating-circle circle1"></div>
            <div className="floating-circle circle2"></div>
            <div className="floating-circle circle3"></div>
        </div>
        
        <div className="content-left">
            <div className="logo-container">
                <div className="logo-text">
                    <span className="infoco-text">INFOCO</span>
                </div>
            </div>
            
            <div className="subtitle">Gestão Pública</div>
            
            <p className="description">
                Transformamos a gestão pública através de soluções inovadoras e eficientes. 
                Sua parceria ideal para modernizar processos e otimizar resultados.
            </p>
            
            <button className="cta-button" onClick={() => alert('Entre em contato conosco!')}>
                Conheça Nossos Serviços
            </button>
        </div>
        
        <div className="avatar-container">
            <div className="avatar">
                <img src="/3d-asset.png" alt="Avatar 3D da INFOCO" />
            </div>
            <div className="avatar-message">
                "Estamos felizes em atender você! Vamos juntos inovar a gestão pública."
            </div>
        </div>
    </div>
);

export default Hero;
