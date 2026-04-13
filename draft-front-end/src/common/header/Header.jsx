import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import './Header.css';
import logo from '../../assets/Imagens_logo/1.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo-section">
                    <img src={logo} alt="Draft Logo" className="header-logo" />
                    <span className="brand-name">Draft</span>
                </div>

                <nav className="desktop-nav">
                    <Link to={routes.home} className="nav-link">Início</Link>
                    <Link to={routes.about} className="nav-link">Sobre</Link>
                    <a href="#features" className="nav-link">Funcionalidades</a>
                    <a href="#contact" className="nav-link">Contato</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
