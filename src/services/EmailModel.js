import axios from 'axios';
import config from '../config/api';

export const saveEmailModelToBackEnd = (payload) => 
  axios.post(
    `${config.host}/reservation/saveEmailModel`,
    payload,
    {
      timeout: 10000,
      headers: {
        Authorization: localStorage.getItem("id_token"),
        hotelid: localStorage.getItem('hotelid'),
      },
    }
  );

export const getEmailModelFromBackEnd = (emailType) =>
  axios.get(
    `${config.host}/reservation/modeleEmail/${emailType}`,
    {
      timeout: 10000,
      headers: {
        Authorization: localStorage.getItem("id_token"),
        hotelid: localStorage.getItem('hotelid'),
      },
    }
);

export const removePhotoFromGallery = (payload) =>
axios.post(
  `${config.host}/galerie/remove`,
  payload,
  {
    timeout: 10000,
    headers: {
      Authorization: localStorage.getItem("id_token"),
      hotelid: localStorage.getItem('hotelid'),
    },
  }
);

export const getGalleryPhotos = () =>
  axios.get(
    `${config.host}/galerie`,
    {
      timeout: 10000,
      headers: {
        Authorization: localStorage.getItem("id_token"),
        hotelid: localStorage.getItem('hotelid'),
      },
    }
);

