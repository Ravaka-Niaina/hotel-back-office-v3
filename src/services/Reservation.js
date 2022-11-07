import axios from 'axios';
import config from '../config/api';


export const getReservationList = (payload) =>
    axios.post(`${config.host}/reservation/partenaire`, payload, {
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotel_id: localStorage.getItem('hotel_id'),
        },
});
export const getNotificationCount = () =>
    axios.post(`${config.host}/notificationReservation/nbNotifReservation`,{},{
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotel_id: localStorage.getItem('hotel_id'),
        },
    }
);
export const getNotificationReservationList = () =>
    axios.post(`${config.host}/notificationReservation`,{},{
        timeout: 10000,
        headers: {
            Authorization: localStorage.getItem('id_token'),
            hotel_id: localStorage.getItem('hotel_id'),
        },
    }
);