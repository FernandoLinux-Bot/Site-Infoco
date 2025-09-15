import React from 'react';

const FlipCard = () => {
  return (
    <div className="flip-card-container">
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h3>Nossa Meta</h3>
            <p>Construir pontes entre tecnologia e cidadania, transformando a gestão pública.</p>
          </div>
          <div className="flip-card-back">
            <h4>Infoco Gestão Pública</h4>
            <p>"A meta é transformar gestão em resultado."</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
