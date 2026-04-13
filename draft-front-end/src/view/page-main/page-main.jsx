import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './page-main.css';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import api from '../../lib/axios';
import routes from '../../routes';
import logo from '../../assets/Imagens_logo/1.png';

const PageMain = () => {
    const navigate = useNavigate();
    const [postContent, setPostContent] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Buscar dados do usuário logado ao carregar a página
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/api/user');
                const data = response.data;

                // Se não tem perfil, redireciona para onboarding
                if (!data.has_profile) {
                    navigate(routes.onboarding);
                    return;
                }

                setUser(data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                // Se não está autenticado, volta pro login
                navigate(routes.login);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    // Extrair informações do perfil de acordo com o tipo
    const getProfileInfo = () => {
        if (!user || !user.profile) return {};

        const profile = user.profile;
        const type = user.user_type;

        if (type === 'atleta') {
            return {
                displayName: profile.nickname || user.name,
                role: 'Atleta',
                detail: profile.primary_sport || '',
                location: profile.endereco || '',
                extra: profile.position ? `Posição: ${profile.position}` : '',
            };
        } else if (type === 'instituicao') {
            return {
                displayName: profile.organization_name || user.name,
                role: 'Instituição',
                detail: profile.institution_type || '',
                location: [profile.city, profile.state, profile.country].filter(Boolean).join(', '),
                extra: profile.sports || '',
            };
        } else if (type === 'agente') {
            return {
                displayName: profile.agency_name || user.name,
                role: 'Agente',
                detail: profile.sports_represented || '',
                location: profile.countries_active || '',
                extra: profile.license_number ? `Licença: ${profile.license_number}` : '',
            };
        }

        return {};
    };

    const profileInfo = getProfileInfo();

    // Dados mockados para o feed (podem ser ignorados por enquanto)
    const feedPosts = [
        {
            id: 1,
            author: 'Lucas Silva',
            role: 'Agente Esportivo',
            time: '2h',
            content: 'Estamos buscando novos talentos Sub-20 para o campeonato regional. Se você conhece algum atleta promissor, me chame no privado! 🏆⚽',
            likes: 42,
            comments: 8,
            shares: 3,
        },
        {
            id: 2,
            author: 'Clube Atlético Paranaense',
            role: 'Instituição',
            time: '5h',
            content: 'Hoje foi dia de treino intenso com a equipe Sub-17. A próxima geração está vindo com tudo! 💪🔥 O Draft tem nos ajudado muito na gestão dos atletas e acompanhamento de desempenho.',
            likes: 128,
            comments: 24,
            shares: 15,
        },
        {
            id: 3,
            author: 'Maria Fernandes',
            role: 'Atleta · Vôlei',
            time: '1d',
            content: 'Muito feliz em anunciar que fui convocada para a seleção estadual de vôlei! Obrigada a todos que fizeram parte dessa jornada. Cada treino valeu a pena. 🏐🇧🇷',
            likes: 256,
            comments: 47,
            shares: 32,
        },
    ];

    const trendingTopics = [
        { title: 'Campeonato Brasileiro Sub-20', readers: '9.877 leitores' },
        { title: 'Mercado de transferências 2026', readers: '5.411 leitores' },
        { title: 'Novas regras da FIFA para agentes', readers: '4.523 leitores' },
        { title: 'Draft atualiza sistema de rankings', readers: '3.180 leitores' },
        { title: 'Copa do Mundo feminina', readers: '2.945 leitores' },
    ];

    // Loading state
    if (loading) {
        return (
            <div className="page-main-wrapper">
                <Header />
                <div className="loading-screen">
                    <div className="loading-spinner"></div>
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    const initial = user?.name?.charAt(0)?.toUpperCase() || '?';

    return (
        <div className="page-main-wrapper">
            <Header />

            <main className="feed-layout">
                {/* ====== SIDEBAR ESQUERDA - Perfil ====== */}
                <aside className="sidebar-left">
                    <div className="profile-card">
                        <div className="profile-banner"></div>
                        <div className="profile-info">
                            <div className="profile-avatar">
                                <span>{initial}</span>
                            </div>
                            <h3 className="profile-name">{user?.name}</h3>
                            <p className="profile-role">
                                {profileInfo.role}
                                {profileInfo.detail ? ` · ${profileInfo.detail}` : ''}
                            </p>
                            {profileInfo.location && (
                                <p className="profile-location">{profileInfo.location}</p>
                            )}
                            {profileInfo.extra && (
                                <p className="profile-extra">{profileInfo.extra}</p>
                            )}
                        </div>

                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-label">E-mail</span>
                                <span className="stat-value-text">{user?.email}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Tipo de Conta</span>
                                <span className="stat-value">
                                    {user?.user_type === 'atleta' ? '⚽ Atleta' :
                                     user?.user_type === 'instituicao' ? '🏛️ Instituição' :
                                     '🤝 Agente'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        <a href="#" className="sidebar-link">
                            <span className="sidebar-icon">📌</span> Itens salvos
                        </a>
                        <a href="#" className="sidebar-link">
                            <span className="sidebar-icon">👥</span> Meus Times
                        </a>
                        <a href="#" className="sidebar-link">
                            <span className="sidebar-icon">🏆</span> Campeonatos
                        </a>
                        <a href="#" className="sidebar-link">
                            <span className="sidebar-icon">📅</span> Eventos
                        </a>
                        <a href="#" className="sidebar-link">
                            <span className="sidebar-icon">📊</span> Estatísticas
                        </a>
                    </nav>
                </aside>

                {/* ====== FEED CENTRAL ====== */}
                <section className="feed-center">
                    {/* Criar publicação */}
                    <div className="create-post-card">
                        <div className="create-post-top">
                            <div className="post-avatar-small">
                                <span>{initial}</span>
                            </div>
                            <input
                                type="text"
                                className="create-post-input"
                                placeholder="Comece uma publicação"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </div>
                        <div className="create-post-actions">
                            <button className="post-action-btn">
                                <span className="action-icon video">▶</span> Vídeo
                            </button>
                            <button className="post-action-btn">
                                <span className="action-icon photo">🖼</span> Foto
                            </button>
                            <button className="post-action-btn">
                                <span className="action-icon article">📝</span> Artigo
                            </button>
                        </div>
                    </div>

                    {/* Filtro */}
                    <div className="feed-filter">
                        <hr className="filter-line" />
                        <span className="filter-text">Classificar por: <strong>Populares</strong> ▾</span>
                    </div>

                    {/* Posts */}
                    {feedPosts.map((post) => (
                        <div className="post-card" key={post.id}>
                            <div className="post-header">
                                <div className="post-avatar">
                                    <span>{post.author.charAt(0)}</span>
                                </div>
                                <div className="post-author-info">
                                    <h4 className="post-author-name">{post.author}</h4>
                                    <p className="post-author-role">{post.role}</p>
                                    <p className="post-time">{post.time}</p>
                                </div>
                                <button className="post-menu-btn">•••</button>
                            </div>

                            <div className="post-content">
                                <p>{post.content}</p>
                            </div>

                            <div className="post-engagement">
                                <span>👍 {post.likes} curtidas</span>
                                <span>{post.comments} comentários · {post.shares} compartilhamentos</span>
                            </div>

                            <div className="post-actions">
                                <button className="post-action">👍 Gostei</button>
                                <button className="post-action">💬 Comentar</button>
                                <button className="post-action">🔄 Compartilhar</button>
                                <button className="post-action">📤 Enviar</button>
                            </div>
                        </div>
                    ))}
                </section>

                {/* ====== SIDEBAR DIREITA - Notícias ====== */}
                <aside className="sidebar-right">
                    <div className="news-card">
                        <h3 className="news-title">
                            <img src={logo} alt="Draft" className="news-logo" />
                            Draft Notícias
                        </h3>
                        <p className="news-subtitle">Assuntos em alta</p>

                        <ul className="news-list">
                            {trendingTopics.map((topic, index) => (
                                <li key={index} className="news-item">
                                    <a href="#">
                                        <span className="news-headline">{topic.title}</span>
                                        <span className="news-readers">{topic.readers}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <button className="news-show-more">Exibir mais ▾</button>
                    </div>

                    <div className="spotlight-card">
                        <h4 className="spotlight-title">Oportunidades no Draft</h4>
                        <div className="spotlight-item">
                            <span className="spotlight-icon">⚡</span>
                            <div>
                                <p className="spotlight-text">Peneiras abertas para Sub-17</p>
                                <p className="spotlight-meta">Inscreva-se até 30/04</p>
                            </div>
                        </div>
                        <div className="spotlight-item">
                            <span className="spotlight-icon">🎯</span>
                            <div>
                                <p className="spotlight-text">Campeonato Regional 2026</p>
                                <p className="spotlight-meta">Vagas para 12 times</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <Footer />
        </div>
    );
};

export default PageMain;
