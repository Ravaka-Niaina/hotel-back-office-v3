import axios from 'axios';
import config from '../config/api';


export const getReservationList = (payload) =>
    axios.post(`${config.host}/reservation/partenaire`, payload, {
        // headers: {
        //     Authorization: idToken,
        // },
});