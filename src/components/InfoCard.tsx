import React from 'react';

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
    return (
        <div className="info-card">
            <div className="info-card-icon-wrapper">
                {icon}
            </div>
            <h3 className="info-card-title">{title}</h3>
            <p className="info-card-description">{description}</p>
        </div>
    );
};

export default InfoCard;
