import axios from 'axios';
import config from '../config/api';

export const getTcTarifPrix = (payload) =>
    axios.post(`${config.host}/TCTarif/prix`, payload, {
        
    }
);

export const configPrix = (payload) =>
    axios.post(`${config.host}/TCTarif/configPrix`, payload, {
        
    }
);