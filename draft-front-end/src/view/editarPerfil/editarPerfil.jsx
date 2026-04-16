import React from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import api from '../../lib/axios';
import logo from '../../assets/Imagens_logo/1.png';
import './editarPerfil.css';

const EditarPerfil = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [userType, setUserType] = React.useState('');
    const [sportsList, setSportsList] = React.useState([]);
    const [errors, setErrors] = React.useState({});
    const [formData, setFormData] = React.useState({});

    const initialByType = {
        atleta: {
            nickname: '',
            birth_date: '',
            nationality: '',
            sport_id: '',
            position: '',
            height_cm: '',
            weight_kg: '',
            dominant_foot: '',
            dominant_hand: '',
            bio: '',
            endereco: '',
            avaliability: '',
            avatar_path: '',
            headline: '',
            instagram: '',
        },
        instituicao: {
            organization_name: '',
            cnpj: '',
            institution_type: '',
            sport_ids: [],
            founded_year: '',
            city: '',
            state: '',
            country: '',
            description: '',
            website: '',
            phone: '',
            logo_path: '',
            headline: '',
            instagram: '',
        },
        agente: {
            agency_name: '',
            license_number: '',
            sports_represented: '',
            countries_active: '',
            bio: '',
            phone: '',
            website: '',
            avatar_path: '',
            headline: '',
            linkedin: '',
        },
    };

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const [userResponse, profileResponse, sportsResponse] = await Promise.all([
                    api.get('/api/user'),
                    api.get('/api/profile'),
                    api.get('/api/sports'),
                ]);

                if (!userResponse.data?.has_profile) {
                    navigate(routes.onboarding);
                    return;
                }

                const type = profileResponse.data.user_type;
                const profile = profileResponse.data.profile || {};

                setSportsList(Array.isArray(sportsResponse.data) ? sportsResponse.data : []);
                setUserType(type);
                setFormData({
                    ...initialByType[type],
                    ...profile,
                    sport_id: profile.sport_id ? Number(profile.sport_id) : '',
                    sport_ids: Array.isArray(profile.sport_ids)
                        ? profile.sport_ids.map(Number)
                        : (Array.isArray(profile.sportsRelation) ? profile.sportsRelation.map((item) => Number(item.id)) : []),
                });
            } catch (error) {
                console.error('Erro ao carregar edicao de perfil:', error);
                navigate(routes.login);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [navigate]);

    const validate = () => {
        const validationErrors = {};

        if (userType === 'atleta') {
            if (!formData.nickname?.trim()) validationErrors.nickname = 'Nickname e obrigatorio.';
            if (!formData.birth_date) validationErrors.birth_date = 'Data de nascimento e obrigatoria.';
            if (!formData.nationality?.trim()) validationErrors.nationality = 'Nacionalidade e obrigatoria.';
            if (!formData.sport_id) validationErrors.sport_id = 'Esporte principal e obrigatorio.';
            if (formData.height_cm && Number(formData.height_cm) <= 0) validationErrors.height_cm = 'Altura deve ser maior que zero.';
            if (formData.weight_kg && Number(formData.weight_kg) <= 0) validationErrors.weight_kg = 'Peso deve ser maior que zero.';
        }

        if (userType === 'instituicao') {
            if (!formData.organization_name?.trim()) validationErrors.organization_name = 'Nome da organizacao e obrigatorio.';
            if (!formData.institution_type?.trim()) validationErrors.institution_type = 'Tipo da instituicao e obrigatorio.';
            if (formData.founded_year && (Number(formData.founded_year) < 1800 || Number(formData.founded_year) > new Date().getFullYear())) {
                validationErrors.founded_year = 'Ano de fundacao invalido.';
            }
            if (formData.cnpj && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.cnpj)) {
                validationErrors.cnpj = 'Use formato 00.000.000/0000-00.';
            }
        }

        if (userType === 'agente' && !formData.agency_name?.trim()) {
            validationErrors.agency_name = 'Nome da agencia e obrigatorio.';
        }

        return validationErrors;
    };

    const setField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const toggleSport = (sportId) => {
        const parsedSportId = Number(sportId);
        const current = Array.isArray(formData.sport_ids) ? formData.sport_ids : [];
        const exists = current.includes(parsedSportId);

        setField(
            'sport_ids',
            exists ? current.filter((item) => item !== parsedSportId) : [...current, parsedSportId],
        );
    };

    const normalizePayload = () => {
        if (userType === 'atleta') {
            return {
                ...formData,
                sport_id: formData.sport_id ? Number(formData.sport_id) : null,
                height_cm: formData.height_cm === '' ? null : Number(formData.height_cm),
                weight_kg: formData.weight_kg === '' ? null : Number(formData.weight_kg),
            };
        }

        if (userType === 'instituicao') {
            return {
                ...formData,
                founded_year: formData.founded_year === '' ? null : Number(formData.founded_year),
                sport_ids: Array.isArray(formData.sport_ids) ? formData.sport_ids.map(Number) : [],
            };
        }

        return { ...formData };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSaving(true);
        setErrors({});

        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.patch(`/api/profile/${userType}`, normalizePayload());

            setSuccessMessage(response.data?.message || 'Perfil atualizado com sucesso.');
            setTimeout(() => navigate(routes.perfil), 900);
        } catch (error) {
            const backendErrors = error.response?.data?.errors;
            if (backendErrors && typeof backendErrors === 'object') {
                const firstMessages = Object.fromEntries(
                    Object.entries(backendErrors).map(([field, messages]) => [field, messages?.[0] || 'Valor invalido.']),
                );
                setErrors(firstMessages);
            } else {
                setErrors({ global: 'Nao foi possivel salvar as alteracoes. Tente novamente.' });
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="edit-page"><div className="edit-card">Carregando dados...</div></div>;
    }

    return (
        <div className="edit-page">
            <div className="edit-card">
                <div className="edit-header">
                    <img src={logo} alt="Draft" className="edit-logo" />
                    <div>
                        <h1>Editar Perfil</h1>
                        <p>Atualize seus dados. As mudancas sao salvas no banco em tempo real.</p>
                    </div>
                </div>

                {errors.global && <div className="form-alert error">{errors.global}</div>}
                {successMessage && <div className="form-alert success">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="edit-form">
                    {userType === 'atleta' && (
                        <>
                            <div className="row two">
                                <div className="field">
                                    <label>Nickname *</label>
                                    <input value={formData.nickname || ''} onChange={(e) => setField('nickname', e.target.value)} />
                                    {errors.nickname && <small>{errors.nickname}</small>}
                                </div>
                                <div className="field">
                                    <label>Data de Nascimento *</label>
                                    <input type="date" value={formData.birth_date || ''} onChange={(e) => setField('birth_date', e.target.value)} />
                                    {errors.birth_date && <small>{errors.birth_date}</small>}
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Nacionalidade *</label>
                                    <input value={formData.nationality || ''} onChange={(e) => setField('nationality', e.target.value)} />
                                    {errors.nationality && <small>{errors.nationality}</small>}
                                </div>
                                <div className="field">
                                    <label>Esporte Principal *</label>
                                    <select value={formData.sport_id || ''} onChange={(e) => setField('sport_id', e.target.value)}>
                                        <option value="">Selecione</option>
                                        {sportsList.map((sport) => (
                                            <option key={sport.id} value={sport.id}>{sport.name}</option>
                                        ))}
                                    </select>
                                    {errors.sport_id && <small>{errors.sport_id}</small>}
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Posicao</label>
                                    <input value={formData.position || ''} onChange={(e) => setField('position', e.target.value)} />
                                </div>
                                <div className="field">
                                    <label>Disponibilidade</label>
                                    <input value={formData.avaliability || ''} onChange={(e) => setField('avaliability', e.target.value)} placeholder="Ex: disponivel" />
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Altura (cm)</label>
                                    <input type="number" value={formData.height_cm || ''} onChange={(e) => setField('height_cm', e.target.value)} />
                                    {errors.height_cm && <small>{errors.height_cm}</small>}
                                </div>
                                <div className="field">
                                    <label>Peso (kg)</label>
                                    <input type="number" value={formData.weight_kg || ''} onChange={(e) => setField('weight_kg', e.target.value)} />
                                    {errors.weight_kg && <small>{errors.weight_kg}</small>}
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Pe Dominante</label>
                                    <select value={formData.dominant_foot || ''} onChange={(e) => setField('dominant_foot', e.target.value)}>
                                        <option value="">Selecione</option>
                                        <option value="Direito">Direito</option>
                                        <option value="Esquerdo">Esquerdo</option>
                                        <option value="Ambidestro">Ambidestro</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Mao Dominante</label>
                                    <select value={formData.dominant_hand || ''} onChange={(e) => setField('dominant_hand', e.target.value)}>
                                        <option value="">Selecione</option>
                                        <option value="Direita">Direita</option>
                                        <option value="Esquerda">Esquerda</option>
                                        <option value="Ambidestro">Ambidestro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Instagram (novo campo)</label>
                                    <input value={formData.instagram || ''} onChange={(e) => setField('instagram', e.target.value)} placeholder="@seuusuario" />
                                </div>
                                <div className="field">
                                    <label>URL do Avatar (novo campo)</label>
                                    <input value={formData.avatar_path || ''} onChange={(e) => setField('avatar_path', e.target.value)} placeholder="https://..." />
                                </div>
                            </div>

                            <div className="field">
                                <label>Headline (novo campo)</label>
                                <input value={formData.headline || ''} onChange={(e) => setField('headline', e.target.value)} placeholder="Resumo rapido do seu perfil" />
                            </div>

                            <div className="field">
                                <label>Endereco</label>
                                <input value={formData.endereco || ''} onChange={(e) => setField('endereco', e.target.value)} />
                            </div>

                            <div className="field">
                                <label>Bio</label>
                                <textarea rows="4" value={formData.bio || ''} onChange={(e) => setField('bio', e.target.value)} />
                            </div>
                        </>
                    )}

                    {userType === 'instituicao' && (
                        <>
                            <div className="row two">
                                <div className="field">
                                    <label>Nome da Organizacao *</label>
                                    <input value={formData.organization_name || ''} onChange={(e) => setField('organization_name', e.target.value)} />
                                    {errors.organization_name && <small>{errors.organization_name}</small>}
                                </div>
                                <div className="field">
                                    <label>Tipo da Instituicao *</label>
                                    <input value={formData.institution_type || ''} onChange={(e) => setField('institution_type', e.target.value)} />
                                    {errors.institution_type && <small>{errors.institution_type}</small>}
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>CNPJ</label>
                                    <input value={formData.cnpj || ''} onChange={(e) => setField('cnpj', e.target.value)} placeholder="00.000.000/0000-00" />
                                    {errors.cnpj && <small>{errors.cnpj}</small>}
                                </div>
                                <div className="field">
                                    <label>Ano de Fundacao</label>
                                    <input type="number" value={formData.founded_year || ''} onChange={(e) => setField('founded_year', e.target.value)} />
                                    {errors.founded_year && <small>{errors.founded_year}</small>}
                                </div>
                            </div>

                            <div className="field">
                                <label>Esportes</label>
                                <div className="sport-grid">
                                    {sportsList.map((sport) => (
                                        <label key={sport.id} className="sport-option">
                                            <input
                                                type="checkbox"
                                                checked={(formData.sport_ids || []).includes(Number(sport.id))}
                                                onChange={() => toggleSport(sport.id)}
                                            />
                                            <span>{sport.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="row three">
                                <div className="field">
                                    <label>Cidade</label>
                                    <input value={formData.city || ''} onChange={(e) => setField('city', e.target.value)} />
                                </div>
                                <div className="field">
                                    <label>Estado</label>
                                    <input value={formData.state || ''} onChange={(e) => setField('state', e.target.value)} />
                                </div>
                                <div className="field">
                                    <label>Pais</label>
                                    <input value={formData.country || ''} onChange={(e) => setField('country', e.target.value)} />
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Telefone (novo campo)</label>
                                    <input value={formData.phone || ''} onChange={(e) => setField('phone', e.target.value)} />
                                </div>
                                <div className="field">
                                    <label>Instagram (novo campo)</label>
                                    <input value={formData.instagram || ''} onChange={(e) => setField('instagram', e.target.value)} />
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Website</label>
                                    <input value={formData.website || ''} onChange={(e) => setField('website', e.target.value)} placeholder="https://..." />
                                </div>
                                <div className="field">
                                    <label>URL da Logo (novo campo)</label>
                                    <input value={formData.logo_path || ''} onChange={(e) => setField('logo_path', e.target.value)} placeholder="https://..." />
                                </div>
                            </div>

                            <div className="field">
                                <label>Headline (novo campo)</label>
                                <input value={formData.headline || ''} onChange={(e) => setField('headline', e.target.value)} placeholder="Resumo institucional" />
                            </div>

                            <div className="field">
                                <label>Descricao</label>
                                <textarea rows="4" value={formData.description || ''} onChange={(e) => setField('description', e.target.value)} />
                            </div>
                        </>
                    )}

                    {userType === 'agente' && (
                        <>
                            <div className="row two">
                                <div className="field">
                                    <label>Nome da Agencia *</label>
                                    <input value={formData.agency_name || ''} onChange={(e) => setField('agency_name', e.target.value)} />
                                    {errors.agency_name && <small>{errors.agency_name}</small>}
                                </div>
                                <div className="field">
                                    <label>Numero de Licenca</label>
                                    <input value={formData.license_number || ''} onChange={(e) => setField('license_number', e.target.value)} />
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Esportes Representados</label>
                                    <input value={formData.sports_represented || ''} onChange={(e) => setField('sports_represented', e.target.value)} />
                                </div>
                                <div className="field">
                                    <label>Paises de Atuacao</label>
                                    <input value={formData.countries_active || ''} onChange={(e) => setField('countries_active', e.target.value)} />
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>Telefone</label>
                                    <input value={formData.phone || ''} onChange={(e) => setField('phone', e.target.value)} />
                                </div>
                                <div className="field">
                                    <label>Website</label>
                                    <input value={formData.website || ''} onChange={(e) => setField('website', e.target.value)} placeholder="https://..." />
                                </div>
                            </div>

                            <div className="row two">
                                <div className="field">
                                    <label>LinkedIn (novo campo)</label>
                                    <input value={formData.linkedin || ''} onChange={(e) => setField('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
                                </div>
                                <div className="field">
                                    <label>URL do Avatar (novo campo)</label>
                                    <input value={formData.avatar_path || ''} onChange={(e) => setField('avatar_path', e.target.value)} placeholder="https://..." />
                                </div>
                            </div>

                            <div className="field">
                                <label>Headline (novo campo)</label>
                                <input value={formData.headline || ''} onChange={(e) => setField('headline', e.target.value)} placeholder="Resumo do seu trabalho" />
                            </div>

                            <div className="field">
                                <label>Bio</label>
                                <textarea rows="4" value={formData.bio || ''} onChange={(e) => setField('bio', e.target.value)} />
                            </div>
                        </>
                    )}

                    <div className="actions">
                        <button type="button" className="btn-secondary" onClick={() => navigate(routes.perfil)} disabled={saving}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary" disabled={saving}>
                            {saving ? 'Salvando...' : 'Salvar Alteracoes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarPerfil;