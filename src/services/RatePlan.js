import axios from 'axios';
import config from '../config/api';

export const getRatePlanList = (payload) =>
    axios.post(`${config.host}/planTarifaire`, payload, {
        // headers: {
        //     partner_id: partnerId,
        // },
});
export const createRatePlanRight = (payload,idToken) =>
    axios.post(`${config.host}/planTarifaire/insert`, payload, {
        headers: {
            Authorization: idToken,
        },
});
