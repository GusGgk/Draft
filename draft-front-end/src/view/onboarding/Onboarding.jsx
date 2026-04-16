import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import api from '../../lib/axios';
import logo from '../../assets/Imagens_logo/1.png';
import './Onboarding.css';

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sportsList, setSportsList] = useState([]); // Lista de esportes

    // Buscar esportes da API ao montar o componente
    React.useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await api.get('/api/sports');
                setSportsList(response.data);
            } catch (error) {
                console.error("Erro ao carregar os esportes:", error);
            }
        };
        fetchSports();
    }, []);

    // Formulários de cada tipo
    const [atletaForm, setAtletaForm] = useState({
        nickname: '', birth_date: '', nationality: '', sport_id: '',
        position: '', height_cm: '', weight_kg: '', dominant_foot: '',
        dominant_hand: '', bio: '', endereco: '',
    });

    const [instituicaoForm, setInstituicaoForm] = useState({
        organization_name: '', cnpj: '', institution_type: '', sport_ids: [],
        founded_year: '', city: '', state: '', country: '', description: '', website: '', phone: '',
    });

    const [agenteForm, setAgenteForm] = useState({
        agency_name: '', license_number: '', sports_represented: '',
        countries_active: '', bio: '', phone: '', website: '',
    });

    // Handlers genéricos para atualizar os campos
    const handleAtletaChange = (e) => setAtletaForm({ ...atletaForm, [e.target.name]: e.target.value });
    const handleInstituicaoChange = (e) => setInstituicaoForm({ ...instituicaoForm, [e.target.name]: e.target.value });
    const handleAgenteChange = (e) => setAgenteForm({ ...agenteForm, [e.target.name]: e.target.value });

    // Handler específico para o multiselect da instituição
    const handleInstituicaoSportToggle = (sportId) => {
        const parsedSportId = Number(sportId);
        const alreadySelected = instituicaoForm.sport_ids.includes(parsedSportId);

        setInstituicaoForm({
            ...instituicaoForm,
            sport_ids: alreadySelected
                ? instituicaoForm.sport_ids.filter((id) => id !== parsedSportId)
                : [...instituicaoForm.sport_ids, parsedSportId],
        });
    };

    // Selecionar tipo e ir para o passo 2
    const selectType = (type) => {
        setUserType(type);
        setStep(2);
    };

    // Enviar formulário para o back-end
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.get('/sanctum/csrf-cookie');

            let data;
            let endpoint;

            if (userType === 'atleta') {
                data = {
                    ...atletaForm,
                    sport_id: atletaForm.sport_id ? Number(atletaForm.sport_id) : '',
                };
                endpoint = '/api/onboarding/atleta';
            } else if (userType === 'instituicao') {
                data = {
                    ...instituicaoForm,
                    sport_ids: instituicaoForm.sport_ids.map(Number),
                };
                endpoint = '/api/onboarding/instituicao';
            } else {
                data = agenteForm;
                endpoint = '/api/onboarding/agente';
            }

            const response = await api.post(endpoint, data);
            console.log(response.data);
            setStep(3);

            // Após 2 segundos de confirmação, redireciona para Home
            setTimeout(() => {
                navigate(routes.home);
            }, 2500);
        } catch (error) {
            console.error('Erro no onboarding:', error.response?.data);
            alert('Erro ao salvar perfil. Verifique os campos e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-wrapper">
            <div className="onboarding-container">
                {/* Logo */}
                <div className="onboarding-logo">
                    <img src={logo} alt="Draft Logo" />
                    <span>Draft</span>
                </div>

                {/* Barra de Progresso */}
                <div className="progress-bar">
                    <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                        <div className="step-circle">1</div>
                        <span>Tipo</span>
                    </div>
                    <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                        <div className="step-circle">2</div>
                        <span>Perfil</span>
                    </div>
                    <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
                    <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                        <div className="step-circle">3</div>
                        <span>Concluído</span>
                    </div>
                </div>

                {/* ========== PASSO 1: Escolher o Tipo ========== */}
                {step === 1 && (
                    <div className="step-content">
                        <h2 className="step-title">Qual o seu perfil?</h2>
                        <p className="step-subtitle">Selecione como você deseja usar o Draft.</p>

                        <div className="type-cards">
                            <button className="type-card" onClick={() => selectType('atleta')}>
                                <div className="type-icon">⚽</div>
                                <h3>Atleta</h3>
                                <p>Crie seu perfil esportivo, mostre suas habilidades e conquiste visibilidade.</p>
                            </button>

                            <button className="type-card" onClick={() => selectType('instituicao')}>
                                <div className="type-icon">🏛️</div>
                                <h3>Instituição</h3>
                                <p>Gerencie times e campeonatos da sua organização esportiva.</p>
                            </button>

                            <button className="type-card" onClick={() => selectType('agente')}>
                                <div className="type-icon">🤝</div>
                                <h3>Agente</h3>
                                <p>Encontre talentos, represente atletas e conecte oportunidades.</p>
                            </button>
                        </div>
                    </div>
                )}

                {/* ========== PASSO 2: Formulário Dinâmico ========== */}
                {step === 2 && (
                    <div className="step-content">
                        <h2 className="step-title">
                            Complete seu perfil de {userType === 'atleta' ? 'Atleta' : userType === 'instituicao' ? 'Instituição' : 'Agente'}
                        </h2>
                        <p className="step-subtitle">Preencha as informações abaixo para começar.</p>

                        <form className="onboarding-form" onSubmit={handleSubmit}>
                            {/* ---- Formulário de Atleta ---- */}
                            {userType === 'atleta' && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Apelido / Nickname *</label>
                                            <input type="text" name="nickname" value={atletaForm.nickname}
                                                onChange={handleAtletaChange} placeholder="Como querem te chamar" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Data de Nascimento *</label>
                                            <input type="date" name="birth_date" value={atletaForm.birth_date}
                                                onChange={handleAtletaChange} required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Nacionalidade *</label>
                                            <input type="text" name="nationality" value={atletaForm.nationality}
                                                onChange={handleAtletaChange} placeholder="Ex: Brasileiro" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Esporte Principal *</label>
                                            <select name="sport_id" value={atletaForm.sport_id}
                                                onChange={handleAtletaChange} required>
                                                <option value="">Selecione um esporte</option>
                                                {sportsList.map(sport => (
                                                    <option key={sport.id} value={sport.id}>
                                                        {sport.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Posição</label>
                                            <input type="text" name="position" value={atletaForm.position}
                                                onChange={handleAtletaChange} placeholder="Ex: Atacante" />
                                        </div>
                                        <div className="form-group">
                                            <label>Altura (cm)</label>
                                            <input type="number" name="height_cm" value={atletaForm.height_cm}
                                                onChange={handleAtletaChange} placeholder="Ex: 180" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Peso (kg)</label>
                                            <input type="number" name="weight_kg" value={atletaForm.weight_kg}
                                                onChange={handleAtletaChange} placeholder="Ex: 75" />
                                        </div>
                                        <div className="form-group">
                                            <label>Pé Dominante</label>
                                            <select name="dominant_foot" value={atletaForm.dominant_foot} onChange={handleAtletaChange}>
                                                <option value="">Selecione</option>
                                                <option value="Direito">Direito</option>
                                                <option value="Esquerdo">Esquerdo</option>
                                                <option value="Ambidestro">Ambidestro</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Mão Dominante</label>
                                            <select name="dominant_hand" value={atletaForm.dominant_hand} onChange={handleAtletaChange}>
                                                <option value="">Selecione</option>
                                                <option value="Direita">Direita</option>
                                                <option value="Esquerda">Esquerda</option>
                                                <option value="Ambidestro">Ambidestro</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Endereço</label>
                                            <input type="text" name="endereco" value={atletaForm.endereco}
                                                onChange={handleAtletaChange} placeholder="Cidade, Estado" />
                                        </div>
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Bio</label>
                                        <textarea name="bio" value={atletaForm.bio}
                                            onChange={handleAtletaChange} placeholder="Conte um pouco sobre você e sua carreira..." rows="3" />
                                    </div>
                                </>
                            )}

                            {/* ---- Formulário de Instituição ---- */}
                            {userType === 'instituicao' && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Nome da Organização *</label>
                                            <input type="text" name="organization_name" value={instituicaoForm.organization_name}
                                                onChange={handleInstituicaoChange} placeholder="Ex: Clube Atlético" required />
                                        </div>
                                        <div className="form-group">
                                            <label>CNPJ</label>
                                            <input type="text" name="cnpj" value={instituicaoForm.cnpj}
                                                onChange={handleInstituicaoChange} placeholder="00.000.000/0000-00" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Tipo de Instituição *</label>
                                            <select name="institution_type" value={instituicaoForm.institution_type}
                                                onChange={handleInstituicaoChange} required>
                                                <option value="">Selecione</option>
                                                <option value="Clube">Clube</option>
                                                <option value="Federação">Federação</option>
                                                <option value="Escola">Escola / Centro de Treinamento</option>
                                                <option value="Outro">Outro</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Esportes</label>
                                            <div className="multi-select" style={{ maxHeight: '140px', overflowY: 'auto' }}>
                                                {sportsList.map(sport => (
                                                    <label key={sport.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', cursor: 'pointer' }}>
                                                        <input
                                                            type="checkbox"
                                                            checked={instituicaoForm.sport_ids.includes(Number(sport.id))}
                                                            onChange={() => handleInstituicaoSportToggle(sport.id)}
                                                        />
                                                        <span>{sport.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <small className="help-text" style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                Selecione uma ou mais modalidades.
                                            </small>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Ano de Fundação</label>
                                            <input type="number" name="founded_year" value={instituicaoForm.founded_year}
                                                onChange={handleInstituicaoChange} placeholder="Ex: 1990" />
                                        </div>
                                        <div className="form-group">
                                            <label>Cidade</label>
                                            <input type="text" name="city" value={instituicaoForm.city}
                                                onChange={handleInstituicaoChange} placeholder="Ex: São Paulo" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Estado</label>
                                            <input type="text" name="state" value={instituicaoForm.state}
                                                onChange={handleInstituicaoChange} placeholder="Ex: SP" />
                                        </div>
                                        <div className="form-group">
                                            <label>País</label>
                                            <input type="text" name="country" value={instituicaoForm.country}
                                                onChange={handleInstituicaoChange} placeholder="Ex: Brasil" />
                                        </div>
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Descrição</label>
                                        <textarea name="description" value={instituicaoForm.description}
                                            onChange={handleInstituicaoChange} placeholder="Descreva sua instituição..." rows="3" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Website</label>
                                        <input type="url" name="website" value={instituicaoForm.website}
                                            onChange={handleInstituicaoChange} placeholder="https://www.exemplo.com" />
                                    </div>
                                </>
                            )}

                            {/* ---- Formulário de Agente ---- */}
                            {userType === 'agente' && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Nome da Agência *</label>
                                            <input type="text" name="agency_name" value={agenteForm.agency_name}
                                                onChange={handleAgenteChange} placeholder="Ex: Sports Agency" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Número da Licença</label>
                                            <input type="text" name="license_number" value={agenteForm.license_number}
                                                onChange={handleAgenteChange} placeholder="Ex: LIC-12345" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Esportes Representados</label>
                                            <input type="text" name="sports_represented" value={agenteForm.sports_represented}
                                                onChange={handleAgenteChange} placeholder="Ex: Futebol, Basquete" />
                                        </div>
                                        <div className="form-group">
                                            <label>Países de Atuação</label>
                                            <input type="text" name="countries_active" value={agenteForm.countries_active}
                                                onChange={handleAgenteChange} placeholder="Ex: Brasil, Portugal" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Telefone</label>
                                            <input type="tel" name="phone" value={agenteForm.phone}
                                                onChange={handleAgenteChange} placeholder="(11) 99999-9999" />
                                        </div>
                                        <div className="form-group">
                                            <label>Website</label>
                                            <input type="url" name="website" value={agenteForm.website}
                                                onChange={handleAgenteChange} placeholder="https://www.exemplo.com" />
                                        </div>
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Bio</label>
                                        <textarea name="bio" value={agenteForm.bio}
                                            onChange={handleAgenteChange} placeholder="Conte sobre sua experiência como agente..." rows="3" />
                                    </div>
                                </>
                            )}

                            {/* Botões de ação */}
                            <div className="form-actions">
                                <button type="button" className="btn-back" onClick={() => setStep(1)}>
                                    ← Voltar
                                </button>
                                <button type="submit" className="btn-submit" disabled={loading}>
                                    {loading ? 'Salvando...' : 'Concluir Cadastro'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ========== PASSO 3: Confirmação ========== */}
                {step === 3 && (
                    <div className="step-content completion-step">
                        <div className="success-icon">✓</div>
                        <h2 className="step-title">Perfil criado com sucesso!</h2>
                        <p className="step-subtitle">
                            Você será redirecionado para a página principal em instantes...
                        </p>
                        <div className="loading-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
