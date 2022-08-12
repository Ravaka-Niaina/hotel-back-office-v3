import axios from 'axios';
import config from '../config/api';

export const getRatePlanList = (payload) =>
    axios.post(`${config.host}/planTarifaire`, payload, {
        // headers: {
        //     partner_id: partnerId,
        // },
});
export const createRatePlan = (payload,idToken) =>
    axios.post(`${config.host}/planTarifaire/insert`, payload, {
        headers: {
            Authorization: idToken,
        },
});

export const updateRatePlan = (payload) =>
    axios.post(`${config.host}/planTarifaire/update`, payload, {
        // headers: {
        //     Authorization: idToken,
        // },
});

export const deleteRatePlan = (payload) =>
    axios.post(`${config.host}/planTarifaire/suppression`, payload, {
        // headers: {
        //     Authorization: idToken,
        // },
});

export const getRoomTypeAndCancelingPoliticList = () =>
    axios.get(`${config.host}/tctarif/TPAvecPA`);

export const getRatePlanDetails = (id) =>
    axios.get(`${config.host}/planTarifaire/details/${id}`);
