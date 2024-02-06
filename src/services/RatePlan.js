import axios from 'axios';
import config from '../config/api';

export const getRatePlanList = (payload, idToken) =>
    axios.post(`${config.host}/planTarifaire`, payload, {
        timeout: 10000,
        headers: {
            Authorization: idToken,
            hotelid: localStorage.getItem('hotelid'),
        },
});
export const createRatePlan = (payload) =>
    axios.post(`${config.host}/planTarifaire/insert`, payload, {
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotelid: localStorage.getItem('hotelid'),
        },
});

export const updateRatePlan = (payload) =>
    axios.post(`${config.host}/planTarifaire/update`, payload, {
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotelid: localStorage.getItem('hotelid'),
        },
});

export const deleteRatePlan = (payload) =>
    axios.post(`${config.host}/planTarifaire/suppression`, payload, {
        timeout: 10000,
        // headers: {
        //     Authorization: idToken,
        // },
});

export const getRoomTypeAndCancelingPoliticList = () =>
    axios.get(`${config.host}/tctarif/TPAvecPA`, {
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotelid: localStorage.getItem('hotelid'),
        },
});

export const getRatePlanDetails = (id) =>
    axios.get(`${config.host}/planTarifaire/details/${id}`,{
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem('id_token'),
            partner_id: localStorage.getItem("partner_id"),
            hotelid: localStorage.getItem('hotelid'),
        },
    });

export const switchRatePlanStatus = (payload) =>
    axios.post(`${config.host}/TCTarif/switchIsTarifActif`, payload, {
        timeout: 10000,
        // headers: {
        //     Authorization: idToken,
        // },
});