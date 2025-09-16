import React from 'react';
import { motion } from "framer-motion";
import { Sparkles, Cpu, BarChart3, ShieldCheck } from "lucide-react";
import './BannerAnimado.css';

// Fix: Create component aliases for motion elements to help with type inference in some environments.
const MDiv = motion.div;
const MH1 = motion.h1;
const MP = motion.p;


export default function BannerAnimado() {
  return (
    <section className="banner-section">
      <div className="banner-background">
        <MDiv
          className="banner-shape1"
          animate={{
            x: [0, 120, -120, 0],
            y: [0, -80, 80, 0],
            rotate: [0, 45, -45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <MDiv
          className="banner-shape2"
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="banner-content-wrapper">
        <MDiv
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="banner-icon-main-wrapper"
        >
          <Sparkles className="banner-icon-main animate-pulse" />
        </MDiv>

        <MH1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="banner-title"
        >
          Parceiros da Gestão Pública
        </MH1>
        
        <MP
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="banner-subtitle"
        >
          Unimos tecnologia, conhecimento e experiência para entregar confiança, segurança e resultados.
        </MP>

        <div className="banner-features-grid">
          {[{
            icon: <Cpu className="banner-feature-icon" />, label: "Inovação Tecnológica"
          }, {
            icon: <BarChart3 className="banner-feature-icon" />, label: "Eficiência e Resultados"
          }, {
            icon: <ShieldCheck className="banner-feature-icon" />, label: "Transparência e Segurança"
          }].map((item, index) => (
            <MDiv
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.3 }}
              whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
              className="banner-feature-item"
            >
              <MDiv
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {item.icon}
              </MDiv>
              <p className="banner-feature-label">{item.label}</p>
            </MDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
