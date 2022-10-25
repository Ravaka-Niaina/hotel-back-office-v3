import axios from 'axios';
import config from '../config/api';

export const getRatePlanList = (payload, idToken) =>
    axios.post(`${config.host}/planTarifaire`, payload, {
        headers: {
            Authorization: idToken,
            hotel_id: localStorage.getItem('hotel_id'),
        },
});
export const createRatePlan = (payload,idToken) =>
    axios.post(`${config.host}/planTarifaire/insert`, payload, {
        headers: {
            Authorization: idToken,
        },
});

export const updateRatePlan = (payload, idToken) =>
    axios.post(`${config.host}/planTarifaire/update`, payload, {
        headers: {
            Authorization: idToken,
        },
});

export const deleteRatePlan = (payload) =>
    axios.post(`${config.host}/planTarifaire/suppression`, payload, {
        // headers: {
        //     Authorization: idToken,
        // },
});

export const getRoomTypeAndCancelingPoliticList = () =>
    axios.get(`${config.host}/tctarif/TPAvecPA`, {
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotel_id: localStorage.getItem('hotel_id'),
        },
});

export const getRatePlanDetails = (id) =>
    axios.get(`${config.host}/planTarifaire/details/${id}`);

export const switchRatePlanStatus = (payload) =>
    axios.post(`${config.host}/TCTarif/switchIsTarifActif`, payload, {
        // headers: {
        //     Authorization: idToken,
        // },
});