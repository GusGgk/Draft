import React from 'react';
import './Footer.css';
import logo from '../../assets/Imagens_logo/1.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-column brand">
                        <div className="footer-logo-section">
                            <img src={logo} alt="Draft Logo" className="footer-logo" />
                            <span className="footer-brand-name">Draft</span>
                        </div>
                        <p className="footer-description">
                            A plataforma definitiva para organizar seus jogos e times. 
                            Onde a paixão pelo esporte ganha estrutura.
                        </p>
                        <div className="social-links">
                            {/* Simple icon placeholders */}
                            <a href="#" className="social-icon">Instagram</a>
                            <a href="#" className="social-icon">LinkedIn</a>
                            <a href="#" className="social-icon">X</a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="footer-column">
                        <h4 className="footer-title">Plataforma</h4>
                        <ul className="footer-links">
                            <li><a href="#">Campeonatos</a></li>
                            <li><a href="#">Meus Times</a></li>
                            <li><a href="#">Jogadores</a></li>
                            <li><a href="#">Rankings</a></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="footer-column">
                        <h4 className="footer-title">Suporte</h4>
                        <ul className="footer-links">
                            <li><a href="#">Ajuda & FAQ</a></li>
                            <li><a href="#">Termos de Uso</a></li>
                            <li><a href="#">Privacidade</a></li>
                            <li><a href="#">Contato</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Draft Inc. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
