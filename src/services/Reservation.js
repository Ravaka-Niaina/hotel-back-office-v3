import axios from 'axios';
import config from '../config/api';


export const getReservationList = (payload) =>
    axios.post(`${config.host}/reservation/partenaire`, payload, {
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotel_id: localStorage.getItem('hotel_id'),
        },
});
export const getNotificationCount = (payload,idToken) =>
    axios.post(`${config.host}/notificationReservation/nbNotifReservation`, payload, {
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotel_id: localStorage.getItem('hotel_id'),
        },
});
export const getNotificationReservationList = (payload,idToken) =>
    axios.post(`${config.host}/notificationReservation`, payload, {
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotel_id: localStorage.getItem('hotel_id'),
        },
});