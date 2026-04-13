import React from 'react';
import './About.css';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import logo from '../assets/Imagens_logo/1.png';

const About = () => {
    return (
        <div className="about-page-wrapper">
            <Header />
            <main className="about-content">
                <section className="hero-section">
                    <div className="hero-content">
                        <img src={logo} alt="Draft Logo" className="hero-logo" />
                        <p className="hero-subtitle">
                            Conectando talentos esportivos, instituições e agentes em uma plataforma única e inovadora.
                        </p>
                    </div>
                </section>

                <section className="mission-vision-section">
                    <div className="card mission-card">
                        <div className="card-icon">🚀</div>
                        <h2>Nossa Missão</h2>
                        <p>
                            Nossa missão é democratizar o acesso a oportunidades reais no mundo esportivo. Queremos dar visibilidade para os atletas em ascensão, facilitando a ponte com clubes, escolinhas e agentes esportivos procurando os próximos grandes talentos.
                        </p>
                    </div>

                    <div className="card vision-card">
                        <div className="card-icon">🌍</div>
                        <h2>Nossa Visão</h2>
                        <p>
                            Ser a maior e mais eficiente plataforma de networking esportivo mundial. Sonhamos com um futuro em que nenhuma carreira brilhante se perca devido à falta de exposição ou acesso aos profissionais certos.
                        </p>
                    </div>
                </section>

                <section className="target-audience-section">
                    <h2>Para quem é o Draft?</h2>
                    <div className="audience-grid">
                        <div className="audience-item">
                            <h3>Atletas</h3>
                            <p>Crie seu perfil profissional, adicione seus históricos, exiba seus melhores vídeos esportivos e seja descoberto por olheiros do mundo todo.</p>
                        </div>
                        <div className="audience-item">
                            <h3>Agentes</h3>
                            <p>Descubra as novas estrelas em ascensão, crie conexões profissionais com atletas e construa o seu próprio portfólio de talentos e contatos.</p>
                        </div>
                        <div className="audience-item">
                            <h3>Instituições</h3>
                            <p>Gerencie seus times ativos, realize divulgação de peneiras (seleções) e otimize o recrutamento de jovens promessas e atletas profissionais.</p>
                        </div>
                    </div>
                </section>
                
                <section className="join-us-section">
                    <h2>Junte-se a Revolução</h2>
                    <p>Faça parte do futuro do esporte.</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
