import axios from 'axios';
import config from '../config/api';

export const getPhotosOfGallery= () => 
    axios.get(`${config.host}/galerie`,{
      timeout: 10000,
      headers: {
        hotelid: localStorage.getItem('hotelid'),
      }
    });

export const removePhotoFromGalerry = (payload) =>
  axios.post(`${config.host}/galerie/remove`, payload,{
    timeout: 10000,
  })