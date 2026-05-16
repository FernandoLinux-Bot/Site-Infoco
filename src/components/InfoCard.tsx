import React from 'react';

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
    return (
        <div className="info-card">
            <div className="info-card-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default InfoCard;
