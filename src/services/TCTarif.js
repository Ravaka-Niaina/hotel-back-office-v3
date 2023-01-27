import axios from 'axios';
import config from '../config/api';

export const getTcTarifPrix = (payload) =>
    axios.post(`${config.host}/TCTarif/prix`, payload, {
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotelid: localStorage.getItem('hotelid'),
        },
    }
);

export const configPrix = (payload) =>
    axios.post(`${config.host}/TCTarif/configPrix`, payload, {
        timeout: 10000,
    }
);
export const configPrixNPers = (payload) =>
    axios.post(`${config.host}/TCTarif/configPrixXPers`, payload, {
        timeout: 10000,
    }
);
export const saveRatePlanAvailability = (payload) =>
    axios.post(`${config.host}/TCTarif/saveRatePlanAvailability`, payload, {
        timeout: 10000,
    }
);