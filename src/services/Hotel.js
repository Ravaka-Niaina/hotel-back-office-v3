import axios from 'axios';
import config from '../config/api';

export const getHotelList = (payload) => 
    axios.post(`${config.host}/hotel`,payload,{
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem("id_token"),
            hotel_id: localStorage.getItem('hotel_id'),
        },
});


export const getHotelDetails = (payload) => 
    axios.get(`${config.host}/hotel/details/${localStorage.getItem('hotel_id')}`,{
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem("id_token"),
            hotel_id: localStorage.getItem('hotel_id'),
        },
});

export const createHotel = (payload,idToken) =>
    axios.post(`${config.host}/hotel/insert`, payload, {
        timeout: 10000,
        headers: {
            Authorization: idToken,
        },
});
export const updateHotel = (payload, idToken) =>
    axios.post(`${config.host}/hotel/update`, payload, {
        timeout: 10000,
        headers: {
            Authorization: idToken,
        },
});
export const deleteHotel = (payload) =>
    axios.post(`${config.host}/delete`, payload, {
        timeout: 10000,
        headers: {
            isPartner: true,
        },
});
