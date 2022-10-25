import axios from 'axios';
import config from '../config/api';


export const getReservationList = (payload) =>
    axios.post(`${config.host}/reservation/partenaire`, payload, {
        // headers: {
        //     Authorization: idToken,
        // },
});
export const getNotificationCount = (payload,idToken) =>
    axios.post(`${config.host}/notificationReservation/nbNotifReservation`, payload, {
        headers: {
            Authorization: idToken,
        },
    });
export const getNotificationReservationList = (payload,idToken) =>
    axios.post(`${config.host}/notificationReservation`, payload, {
        headers: {
            Authorization: idToken,
        },
});