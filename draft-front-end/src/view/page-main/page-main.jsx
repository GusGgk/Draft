import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    // Estado para busca de Instituições (perfil Atleta)
    const [sportsList, setSportsList] = useState([]);
    const [selectedSport, setSelectedSport] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    // Estado para busca de Atletas (perfil Agente)
    const [atletaFilters, setAtletaFilters] = useState({
        weight_min: '', weight_max: '',
        height_min: '', height_max: '',
        dominance: '', //endereco:'',
    });
    const [atletaResults, setAtletaResults] = useState([]);
    const [atletaSearchLoading, setAtletaSearchLoading] = useState(false);

    // Estado do Modal de Detalhes
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [detailType, setDetailType] = useState(null);

    const openDetailModal = (item, type) => {
        setSelectedDetail(item);
        setDetailType(type);
    };

    const closeDetailModal = () => {
        setSelectedDetail(null);
        setDetailType(null);
    };

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

    // Carregar lista de modalidades esportivas quando o usuário estiver carregado
    useEffect(() => {
        if (!user) return;
        if (user.user_type === 'atleta' || user.user_type === 'agente') {
            const fetchSports = async () => {
                try {
                    const response = await api.get('/api/sports');
                    setSportsList(response.data);
                } catch (error) {
                    console.error('Erro ao buscar modalidades:', error);
                }
            };
            fetchSports();
        }
    }, [user]);

    // Buscar instituições por modalidade (perfil Atleta)
    const handleSearchInstituicoes = async (sportId) => {
        if (!sportId) {
            setSearchResults([]);
            return;
        }
        setSearchLoading(true);
        try {
            const response = await api.get(`/api/search/instituicoes?sport_id=${sportId}`);
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Erro na busca de instituições:', error);
        } finally {
            setSearchLoading(false);
        }
    };

    // Buscar atletas por características (perfil Agente)
    const handleSearchAtletas = async (e) => {
        e.preventDefault();
        setAtletaSearchLoading(true);
        try {
            const params = new URLSearchParams();
            if (atletaFilters.weight_min) params.append('weight_min', atletaFilters.weight_min);
            if (atletaFilters.weight_max) params.append('weight_max', atletaFilters.weight_max);
            if (atletaFilters.height_min) params.append('height_min', atletaFilters.height_min);
            if (atletaFilters.height_max) params.append('height_max', atletaFilters.height_max);
            if (atletaFilters.dominance) params.append('dominance', atletaFilters.dominance);
            //if (atletaFilters.endereco) params.append('endereco', atletaFilters.endereco);

            const response = await api.get(`/api/search/atletas?${params.toString()}`);
            setAtletaResults(response.data.data);
        } catch (error) {
            console.error('Erro na busca de atletas:', error);
        } finally {
            setAtletaSearchLoading(false);
        }
    };

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

    // Lidar com o logout do usuário
    const handleLogout = async () => {
        try {
            await api.post('/api/logout');
            navigate(routes.login);
        } catch (error) {
            console.error('Erro ao sair:', error);
            // Mesmo com erro, redireciona para garantir a saída no frontend
            navigate(routes.login);
        }
    };

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
                        <Link to={routes.perfil} className="sidebar-link">
                            <span className="sidebar-icon">👤</span> Meu Perfil
                        </Link>
                        <Link to={routes.editarPerfil} className="sidebar-link">
                            <span className="sidebar-icon">✏️</span> Editar Perfil
                        </Link>
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
                        <div className="sidebar-divider" style={{ borderTop: '1px solid var(--border-color)', margin: '10px 0' }}></div>
                        <a href="#" className="sidebar-link logout-link" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                            <span className="sidebar-icon">🚪</span> Sair da Conta
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

                {/* ====== SIDEBAR DIREITA - Busca + Notícias ====== */}
                <aside className="sidebar-right">

                    {/* ====== BUSCA DE INSTITUIÇÕES (Perfil Atleta) ====== */}
                    {user?.user_type === 'atleta' && (
                        <div className="search-card">
                            <div className="search-card-header">
                                <span className="search-card-icon">🏛️</span>
                                <h3 className="search-card-title">Buscar Instituições</h3>
                            </div>
                            <p className="search-card-desc">Encontre instituições pela modalidade esportiva</p>

                            <div className="search-field">
                                <label htmlFor="sport-select" className="search-label">Modalidade</label>
                                <select
                                    id="sport-select"
                                    className="search-select"
                                    value={selectedSport}
                                    onChange={(e) => {
                                        setSelectedSport(e.target.value);
                                        handleSearchInstituicoes(e.target.value);
                                    }}
                                >
                                    <option value="">Selecione uma modalidade</option>
                                    {sportsList.map((sport) => (
                                        <option key={sport.id} value={sport.id}>
                                            {sport.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Resultados */}
                            {searchLoading && (
                                <div className="search-loading">
                                    <div className="loading-spinner-sm"></div>
                                    <span>Buscando...</span>
                                </div>
                            )}

                            {!searchLoading && selectedSport && (
                                <div className="search-results">
                                    <p className="search-results-count">
                                        {searchResults.length} instituição(ões) encontrada(s)
                                    </p>
                                    {searchResults.map((inst) => (
                                        <div key={inst.idInstituicao} className="search-result-item" onClick={() => openDetailModal(inst, 'instituicao')}>
                                            <div className="result-avatar">
                                                {inst.organization_name?.charAt(0)?.toUpperCase() || '?'}
                                            </div>
                                            <div className="result-info">
                                                <p className="result-name">{inst.organization_name}</p>
                                                <p className="result-detail">{inst.institution_type}</p>
                                                <p className="result-location">
                                                    {[inst.city, inst.state].filter(Boolean).join(', ')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ====== BUSCA DE ATLETAS (Perfil Agente) ====== */}
                    {user?.user_type === 'agente' && (
                        <div className="search-card">
                            <div className="search-card-header">
                                <span className="search-card-icon">🔍</span>
                                <h3 className="search-card-title">Buscar Atletas</h3>
                            </div>
                            <p className="search-card-desc">Filtre atletas por características físicas</p>

                            <form onSubmit={handleSearchAtletas} className="search-form">
                                <div className="search-range-group">
                                    <label className="search-label">Peso (kg)</label>
                                    <div className="search-range-inputs">
                                        <input
                                            type="number"
                                            className="search-input"
                                            placeholder="Min"
                                            value={atletaFilters.weight_min}
                                            onChange={(e) => setAtletaFilters({...atletaFilters, weight_min: e.target.value})}
                                        />
                                        <span className="range-separator">—</span>
                                        <input
                                            type="number"
                                            className="search-input"
                                            placeholder="Max"
                                            value={atletaFilters.weight_max}
                                            onChange={(e) => setAtletaFilters({...atletaFilters, weight_max: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="search-range-group">
                                    <label className="search-label">Altura (cm)</label>
                                    <div className="search-range-inputs">
                                        <input
                                            type="number"
                                            className="search-input"
                                            placeholder="Min"
                                            value={atletaFilters.height_min}
                                            onChange={(e) => setAtletaFilters({...atletaFilters, height_min: e.target.value})}
                                        />
                                        <span className="range-separator">—</span>
                                        <input
                                            type="number"
                                            className="search-input"
                                            placeholder="Max"
                                            value={atletaFilters.height_max}
                                            onChange={(e) => setAtletaFilters({...atletaFilters, height_max: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="search-field">
                                    <label className="search-label">Dominância</label>
                                    <select
                                        className="search-select"
                                        value={atletaFilters.dominance}
                                        onChange={(e) => setAtletaFilters({...atletaFilters, dominance: e.target.value})}
                                    >
                                        <option value="">Todos</option>
                                        <option value="direito">Destro (Direito)</option>
                                        <option value="esquerdo">Canhoto (Esquerdo)</option>
                                        <option value="ambidestro">Ambidestro</option>
                                    </select>
                                </div>
                                {/*<div className="search-field">
                                    <label className="search-label">Cidade</label>
                                    <input type="text" className="search-input"
                                    placeholder="Curitiba"
                                    value={atletaFilters.endereco}
                                    onChange={(e) => setAtletaFilters({...atletaFilters, endereco: e.target.value})}
                                     />

                                </div>
                                */}

                                <button type="submit" className="search-btn" disabled={atletaSearchLoading}>
                                    {atletaSearchLoading ? 'Buscando...' : '🔎 Buscar Atletas'}
                                </button>
                            </form>

                            {/* Resultados */}
                            {!atletaSearchLoading && atletaResults.length > 0 && (
                                <div className="search-results">
                                    <p className="search-results-count">
                                        {atletaResults.length} atleta(s) encontrado(s)
                                    </p>
                                    {atletaResults.map((atleta) => (
                                        <div key={atleta.idAtleta} className="search-result-item" onClick={() => openDetailModal(atleta, 'atleta')}>
                                            <div className="result-avatar">
                                                {atleta.nickname?.charAt(0)?.toUpperCase() || '?'}
                                            </div>
                                            <div className="result-info">
                                                <p className="result-name">{atleta.nickname}</p>
                                                <p className="result-detail">
                                                    {atleta.sport?.name || atleta.primary_sport || 'Esporte não definido'}
                                                    {atleta.position ? ` · ${atleta.position}` : ''}
                                                   {/*{atleta.endereco ? ` · ${atleta.endereco}` : ''}*/} 
                                                </p>
                                                <p className="result-stats">
                                                    {atleta.height_cm ? `${atleta.height_cm}cm` : ''}
                                                    {atleta.height_cm && atleta.weight_kg ? ' · ' : ''}
                                                    {atleta.weight_kg ? `${atleta.weight_kg}kg` : ''}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!atletaSearchLoading && atletaResults.length === 0 && atletaFilters.weight_min === '' && atletaFilters.height_min === '' && atletaFilters.dominance === '' && /*atletaFilters.endereco === '' &&*/(
                                <p className="search-empty-hint">Preencha os filtros acima e clique em buscar</p>
                            )}
                        </div>
                    )}

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

            {/* ====== MODAL DE DETALHES ====== */}
            {selectedDetail && (
                <div className="search-modal-overlay" onClick={closeDetailModal}>
                    <div className="search-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="search-modal-close" onClick={closeDetailModal}>×</button>
                        
                        <div className="search-modal-header">
                            <div className="search-modal-avatar">
                                {detailType === 'instituicao' 
                                    ? selectedDetail.organization_name?.charAt(0)?.toUpperCase() || '?'
                                    : selectedDetail.nickname?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div className="search-modal-title-group">
                                <h2 className="search-modal-title">
                                    {detailType === 'instituicao' ? selectedDetail.organization_name : selectedDetail.nickname}
                                </h2>
                                <p className="search-modal-subtitle">
                                    {detailType === 'instituicao' 
                                        ? selectedDetail.institution_type 
                                        : (selectedDetail.sport?.name || selectedDetail.primary_sport || 'Atleta')}
                                </p>
                            </div>
                        </div>

                        <div className="search-modal-body">
                            {detailType === 'instituicao' && (
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Ano de Fundação</span>
                                        <span className="detail-value">{selectedDetail.founded_year || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Localização</span>
                                        <span className="detail-value">{[selectedDetail.city, selectedDetail.state, selectedDetail.country].filter(Boolean).join(', ') || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item full-width">
                                        <span className="detail-label">Site Institucional</span>
                                        <span className="detail-value">
                                            {selectedDetail.website 
                                                ? <a href={selectedDetail.website} target="_blank" rel="noopener noreferrer" className="detail-link">{selectedDetail.website}</a> 
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="detail-item full-width">
                                        <span className="detail-label">Descrição</span>
                                        <p className="detail-desc">{selectedDetail.description || 'Sem descrição cadastrada.'}</p>
                                    </div>
                                </div>
                            )}

                            {detailType === 'atleta' && (
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Posição</span>
                                        <span className="detail-value">{selectedDetail.position || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Estatísticas</span>
                                        <span className="detail-value">
                                            {selectedDetail.height_cm ? `${selectedDetail.height_cm} cm` : '--'} / {selectedDetail.weight_kg ? `${selectedDetail.weight_kg} kg` : '--'}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Pé Dominante</span>
                                        <span className="detail-value">{selectedDetail.dominant_foot || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Mão Dominante</span>
                                        <span className="detail-value">{selectedDetail.dominant_hand || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item full-width">
                                        <span className="detail-label">Localidade</span>
                                        <span className="detail-value">{selectedDetail.endereco || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item full-width">
                                        <span className="detail-label">Biografia</span>
                                        <p className="detail-desc">{selectedDetail.bio || 'Sem biografia cadastrada.'}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="search-modal-footer">
                            <button className="btn-modal-contact">Conectar</button>
                            <button className="btn-modal-secondary" onClick={closeDetailModal}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageMain;