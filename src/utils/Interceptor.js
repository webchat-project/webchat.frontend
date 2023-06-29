import axios from "axios";

const interceptor = axios.create({
    url: "http://localhost:5000"
})

// Interceptor per le richieste
interceptor.interceptors.request.use(
    (config) => { return config; },
    (error) => { return Promise.reject(error); }
)

// Interceptor per le risposte
api.interceptors.response.use(
    (response) => {
        // Puoi eseguire operazioni sulla risposta prima che venga restituita
        // Ad esempio, puoi eseguire una formattazione o un'elaborazione dei dati

        return response;
    },
    (error) => {
        // Gestisci eventuali errori legati all'interceptor delle risposte
        return Promise.reject(error);
    }
);

export default api;