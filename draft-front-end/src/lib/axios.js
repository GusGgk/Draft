import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // URL base do nosso laravel
    withCredentials: true, // para enviar cookies junto com as requisições
    withXSRFToken: true, // para incluir o token CSRF nas requisições
});

api.defaults.xsrfCookieName = 'XSRF-TOKEN';
api.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

export default api;