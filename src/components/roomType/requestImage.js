import axios from "axios";
import { base64ToBlob } from 'base64-blob';
import config from '../../config/api';

export function uploadImage({method, url, data, callback, setProgress, errorCallback}){
    const formData = new FormData();
    base64ToBlob(data.file).then((blob) => {
        formData.append("image", blob);
        
        const headers = {
            "Content-Type": "multipart/form-data; boundary=&",
            "hotelid": localStorage.getItem("hotelid")
        };
        console.log(config.host + url);
        console.log(method);
        
        axios({
            method,      
            url: config.host + url,
            // withCredentials: true,
            data: formData,
            headers,
            onUploadProgress: progressEvent => {
                const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                if(setProgress){
                    setProgress(percentCompleted);
                }
            }
        })
        .then(res => {callback();console.log(res)})
        .catch(err =>{ console.log(err); errorCallback(err) });
    });
    
}