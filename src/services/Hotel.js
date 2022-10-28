import axios from 'axios';
import config from '../config/api';

export const getHotelList = (payload) => 
    axios.post(`${config.host}/hotel`,payload,{
    headers: {
        Authorization: localStorage.getItem("id_token"),
        hotel_id: localStorage.getItem('hotel_id'),
        },
});

export const createHotel = (payload,idToken) =>
    axios.post(`${config.host}/hotel/insert`, payload, {
        headers: {
            Authorization: idToken,
        },
});
export const updateHotel = (payload, idToken) =>
    axios.post(`${config.host}/hotel/update`, payload, {
        headers: {
            Authorization: idToken,
        },
});
export const deleteHotel = (payload) =>
    axios.post(`${config.host}/delete`, payload, {
        headers: {
            isPartner: true,
        },
});
