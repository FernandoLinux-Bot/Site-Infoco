const AnimatedIdentityCard = () => {
  return (
    <div className="flip-card-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <span className="eyebrow" style={{ color: 'rgba(244,239,228,0.65)' }}>Infoco / Manifesto</span>
            <h3 style={{ marginTop: 'auto' }}>
              Parceiros da<br /><em>gestão pública</em>.
            </h3>
            <p style={{ marginTop: '0.8rem', fontSize: '0.95rem' }}>
              Tecnologia que serve o cidadão.
            </p>
          </div>
          <div className="flip-card-back">
            <span className="eyebrow" style={{ color: 'rgba(244,239,228,0.7)' }}>Citação</span>
            <h4 style={{ marginTop: 'auto' }}>
              "Unimos tecnologia, conhecimento e experiência para entregar confiança e resultados."
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedIdentityCard;
