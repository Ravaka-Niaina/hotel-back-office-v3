/* eslint-disable */
import { useEffect , useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import UploadFileIcon from '@mui/icons-material/UploadFile';

import { getGalleryPhotos, removePhotoFromGallery } from '../../services/EmailModel';
import styles from './Galerie.module.css';
import config from '../../config/api';
import UploadPhoto from '../roomType/UploadPhoto';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '600px',
    overflow: 'scroll',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const concat = (firstArray, secondArray) => {
    const tmpFirst = JSON.parse(JSON.stringify(firstArray));
    for(let i = 0; i < secondArray.length; i+= 1){
        tmpFirst.push(secondArray[i]);
    }
    return tmpFirst;
};

const removePhotoLocal = (preview, setPreview, photo, setPhoto, indicePhoto) => {
    const tmpPreview = JSON.parse(JSON.stringify(preview));
    tmpPreview.splice(indicePhoto, 1);
    setPreview(tmpPreview);
  
    const tmpPhoto = JSON.parse(JSON.stringify(photo));
    tmpPhoto.splice(indicePhoto, 1);
    setPhoto(tmpPhoto);
};

const removePhoto = (event, preview, setPreview, photo, setPhoto, indicePhoto) => {
    event.preventDefault();
    if(photo[indicePhoto].startsWith("galerie\\")) {
        removePhotoFromGallery({_id: photo[indicePhoto]})
        .then((response) => {
            if(response.data.status === 200){
                removePhotoLocal(preview, setPreview, photo, setPhoto, indicePhoto);
            }
        });
    } else {
        removePhotoLocal(preview, setPreview, photo, setPhoto, indicePhoto);
    }
};

const GalerieUnique = ({showGalerie, setShowGalerie, photoSortie, setPhotoSortie, nbPhotoBeforeSortie, previewSortie, setPreviewSortie,setLogo}) => {
    const [photo, setPhoto] = useState([]);
    const [preview, setPreview] = useState([]);
    const [areImagesLoading, setAreImagesLoading] = useState(false);
    const [nbImage, setNbImage] = useState(0);
    const [selectImage, setSelectImage] = useState(true);
    const [imageSelected, setImageSelected] = useState([]);
    const [showUpload, setShowUpload] = useState(false);

    function getContentGalerie(){
        getGalleryPhotos()
        .then(response => {
            const {data} = response;
            if(data.status === 200){
                const tmpPreview = [];
                const tmpPhoto = [];
                const tmpImageSelected = [];
                for(let i = 0; i < data.photos.length; i+= 1){
                    tmpPreview[i] =  `${config.host }/${  data.photos[i]._id}`;
                    tmpPhoto[i] = data.photos[i]._id;
                    imageSelected[i] = false;
                }
                setPreview(tmpPreview);
                setPhoto(tmpPhoto);
                setImageSelected(tmpImageSelected);
            }
        })
    }

    useEffect(() => {
        getContentGalerie();
    }, []);

    function handlePhotoChange(e){
        if(e.target.files.length > 0){
            setAreImagesLoading(true);
            const tmpPhoto = [];
            const tmpPreview = [];
            let finished = 0;
            setNbImage(e.target.files.length + photo.length);
            for(let i = 0; i < e.target.files.length; i+= 1){
                const u = i;
                const img = e.target.files[i];
                const r = /^image/;
                if(r.test(img.type)){
                    const reader = new FileReader();
                    
                    reader.onload = (evt) => {
                        tmpPhoto[u] = evt.target.result;
                        tmpPreview[u] = evt.target.result;
                        finished+= 1;
                        if(finished === e.target.files.length){
                            // savePhotoToBack(tmpPhoto);
                            setPhoto(concat(photo, tmpPhoto));
                            setPreview(concat(preview, tmpPreview));
                        }
                    }
                    reader.readAsDataURL(img);
                }
            }
        }
    }

    function closeGalerie(){
        setShowGalerie(false);
        setImageSelected(new Array(imageSelected.length).fill(false));
    }

    function choosePhotos(e){
        e.preventDefault();
        nbPhotoBeforeSortie.value = photoSortie.length;
        const photosToTake = [];
        const previewToTake = [];
        for(let i = 0; i < imageSelected.length; i+= 1){
            if(imageSelected[i]){
                
                const url =`${process.env.REACT_APP_BACK_URL  }/${  photo[i]}`;
                setLogo(url);
                
                break;
            }
        }
        // setPhotoSortie(photoSortie.concat(photosToTake));
        // setPreviewSortie(previewSortie.concat(previewToTake));
        closeGalerie();
    }

    function switchSelectImage(e){
        e.preventDefault();
        if(selectImage){
            setImageSelected(new Array(imageSelected.length).fill(false))
        }
        setSelectImage(!selectImage);
    }
    
    function changeImageSelected(i){
        const tmp = JSON.parse(JSON.stringify(imageSelected));
    
        if(selectImage){
            tmp[i] = !tmp[i];
            if(tmp[i]){
                for(let j=0;j<tmp.length;j+= 1){
                    if(i!==j){
                        tmp[j] = false;
                    }
                }
            }
        }
        setImageSelected(tmp);
    }
    
    function switchShowUpload(e){
        e.preventDefault();
        setShowUpload(!showUpload);
    }

    return(
        <>
            <Modal
                open={showGalerie}
                onClose={closeGalerie}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {preview.map((imgSrc, i) => (
                            <div 
                                className={selectImage 
                                    ? imageSelected[i] 
                                        ? `${styles.conteneurPhoto  } ${  styles.conteneurPhoto1  } ${  styles.photoSelected}`
                                        : `${styles.conteneurPhoto  } ${  styles.conteneurPhoto1}` 
                                    : `${styles.conteneurPhoto  } ${  styles.conteneurPhoto1}`}
                                onClick={() => changeImageSelected(i)}>
                                    <div className={styles.close}><button onClick={(e) => removePhoto(e, preview, setPreview, photo, setPhoto, i)}><span>X</span></button></div>
                                    <img className={styles.photo} src={imgSrc} />
                            </div>
                        ))}
                    {preview.length === 0 ? <div>Aucune photo</div> : null}
                    <div>
                        <Button 
                            variant="outlined"
                            type="submit"
                            id="upload"
                            startIcon={<UploadFileIcon />}
                            onClick={switchShowUpload}
                        >
                            Upload
                        </Button>
                        <Button  
                            variant="contained" 
                            type='submit' 
                            id='btn1'
                            onClick={choosePhotos}
                            style={{backgroundColor:'#2ac4ea' }}>Selectionner</Button>
                   
                    </div>
                </Box>
            </Modal>
            <UploadPhoto
                showUpload={showUpload} 
                switchShowUpload={switchShowUpload}
                removePhotoLocal={removePhotoLocal}
                getContentGallery={getContentGalerie}
            />
        </>
    );
};

export default GalerieUnique;