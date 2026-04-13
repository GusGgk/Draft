import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes';
import api from '../../lib/axios';
import logo from '../../assets/Imagens_logo/1.png';
import Header from '../../common/header/Header';
import cocomateus from '../../assets/Imagens_logo/2.png';
import './configuracoes.css';

const Configuracoes = () => {
	return (
        <div>
            <Header />
                <img src="" ></img> 
                <p>Perfil</p>,
                <p>Segurança</p>,
                <p>Notificações</p>,
                <p>Aparencia</p>,
                <p>Preferências</p>
        </div>
        
    );
    
};


export default Configuracoes;