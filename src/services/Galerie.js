import axios from 'axios';
import config from '../config/api';

export const getPhotosOfGallery= (payload) => 
    axios.get(`${config.host}/galerie`);

export const removePhotoFromGalerry = (payload) =>
  axios.post(`${config.host}/galerie/remove`, payload)