import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import api from '../../lib/axios';
import logo from '../../assets/Imagens_logo/1.png';
import './perfil.css';

const Perfil = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    const [userType, setUserType] = React.useState(null);
    const [profile, setProfile] = React.useState(null);

    React.useEffect(() => {
        const loadProfile = async () => {
            try {
                const [userResponse, profileResponse] = await Promise.all([
                    api.get('/api/user'),
                    api.get('/api/profile'),
                ]);

                if (!userResponse.data?.has_profile) {
                    navigate(routes.onboarding);
                    return;
                }

                setUser(userResponse.data);
                setUserType(profileResponse.data.user_type);
                setProfile(profileResponse.data.profile);
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
                navigate(routes.login);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [navigate]);

    const renderAtleta = () => (
        <>
            <div className="profile-grid">
                <div><strong>Nickname:</strong> {profile.nickname || 'N/A'}</div>
                <div><strong>Esporte:</strong> {profile.sport?.name || profile.primary_sport || 'N/A'}</div>
                <div><strong>Posicao:</strong> {profile.position || 'N/A'}</div>
                <div><strong>Nacionalidade:</strong> {profile.nationality || 'N/A'}</div>
                <div><strong>Altura:</strong> {profile.height_cm ? `${profile.height_cm} cm` : 'N/A'}</div>
                <div><strong>Peso:</strong> {profile.weight_kg ? `${profile.weight_kg} kg` : 'N/A'}</div>
                <div><strong>Pe dominante:</strong> {profile.dominant_foot || 'N/A'}</div>
                <div><strong>Mao dominante:</strong> {profile.dominant_hand || 'N/A'}</div>
                <div><strong>Disponibilidade:</strong> {profile.avaliability || 'N/A'}</div>
                <div><strong>Instagram:</strong> {profile.instagram || 'N/A'}</div>
            </div>
            <p className="profile-bio"><strong>Headline:</strong> {profile.headline || 'N/A'}</p>
            <p className="profile-bio"><strong>Bio:</strong> {profile.bio || 'Sem biografia.'}</p>
            <p className="profile-bio"><strong>Endereco:</strong> {profile.endereco || 'N/A'}</p>
        </>
    );

    const renderInstituicao = () => (
        <>
            <div className="profile-grid">
                <div><strong>Nome:</strong> {profile.organization_name || 'N/A'}</div>
                <div><strong>Tipo:</strong> {profile.institution_type || 'N/A'}</div>
                <div><strong>CNPJ:</strong> {profile.cnpj || 'N/A'}</div>
                <div><strong>Fundacao:</strong> {profile.founded_year || 'N/A'}</div>
                <div><strong>Cidade:</strong> {profile.city || 'N/A'}</div>
                <div><strong>Estado:</strong> {profile.state || 'N/A'}</div>
                <div><strong>Pais:</strong> {profile.country || 'N/A'}</div>
                <div><strong>Telefone:</strong> {profile.phone || 'N/A'}</div>
                <div><strong>Instagram:</strong> {profile.instagram || 'N/A'}</div>
                <div><strong>Website:</strong> {profile.website || 'N/A'}</div>
            </div>
            <p className="profile-bio"><strong>Headline:</strong> {profile.headline || 'N/A'}</p>
            <p className="profile-bio"><strong>Descricao:</strong> {profile.description || 'Sem descricao.'}</p>
            <p className="profile-bio">
                <strong>Esportes:</strong>{' '}
                {Array.isArray(profile.sportsRelation) && profile.sportsRelation.length > 0
                    ? profile.sportsRelation.map((item) => item.name).join(', ')
                    : 'Nenhuma modalidade vinculada'}
            </p>
        </>
    );

    const renderAgente = () => (
        <>
            <div className="profile-grid">
                <div><strong>Agencia:</strong> {profile.agency_name || 'N/A'}</div>
                <div><strong>Licenca:</strong> {profile.license_number || 'N/A'}</div>
                <div><strong>Esportes:</strong> {profile.sports_represented || 'N/A'}</div>
                <div><strong>Paises:</strong> {profile.countries_active || 'N/A'}</div>
                <div><strong>Telefone:</strong> {profile.phone || 'N/A'}</div>
                <div><strong>Website:</strong> {profile.website || 'N/A'}</div>
                <div><strong>LinkedIn:</strong> {profile.linkedin || 'N/A'}</div>
            </div>
            <p className="profile-bio"><strong>Headline:</strong> {profile.headline || 'N/A'}</p>
            <p className="profile-bio"><strong>Bio:</strong> {profile.bio || 'Sem biografia.'}</p>
        </>
    );

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-card-large">Carregando perfil...</div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="profile-page">
                <div className="profile-card-large">Nenhum perfil encontrado.</div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-card-large">
                <div className="profile-header">
                    <img src={logo} alt="Draft" className="profile-logo" />
                    <div>
                        <h1>{user?.name || 'Perfil'}</h1>
                        <p>{user?.email}</p>
                        <span className="profile-chip">{userType}</span>
                    </div>
                </div>

                {userType === 'atleta' && renderAtleta()}
                {userType === 'instituicao' && renderInstituicao()}
                {userType === 'agente' && renderAgente()}

                <div className="profile-actions">
                    <button type="button" onClick={() => navigate(routes.home)} className="btn-secondary">
                        Voltar para Home
                    </button>
                    <button type="button" onClick={() => navigate(routes.editarPerfil)} className="btn-primary">
                        Editar Perfil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Perfil;