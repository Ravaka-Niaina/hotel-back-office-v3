import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Dialog, DialogActions, DialogContent, Checkbox } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// components
import { createRoomType, fetchListEquipments, fetchListRatePlans, getRoomType, updateRoomType, } from '../../services/RoomType';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import AddImageCrop from './AddImageCrop';
import Galerie from './Galerie';
import Equipments from './Equipments';
import RatePlans from './RatePlans';
import styles from './RoomTypeForm.module.css';
import config from '../../config/api';

const imgCrop = null;
const RoomTypeForm = ({ 
  reload, 
  open,
  setOpen, 
  roomTypeId,
  isUpdate,
}) => {
  
  // const [errors, setErrors] = useState({});
  const errors = {};
  const [roomType, setRoomType] = useState({
    nameInFrench: '',
    nameInEnglish: '',
    numberOfRoom: '',
    areaSize: '',
    stageNumber: '',
    adultNumber: '',
    childNumber: '',
    descriptionInFrench: '',
    descriptionInEnglish: '',
    videos: [],
    photo: [],
    imgCrop: '',
  });
  const [showGalerie, setShowGalerie] = useState(false);
  const [output, setOutput] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [ratePlans, setRatePlans] = useState([]);
  const [photoSortie, setPhotoSortie] = useState([]);
  const [previewSortie, setPreviewSortie] = useState([]);

  const clearForm = () => {
    setRoomType({
      nameInFrench: '',
      nameInEnglish: '',
      numberOfRoom: '',
      areaSize: '',
      stageNumber: '',
      adultNumber: '',
      childNumber: '',
      descriptionInFrench: '',
      descriptionInEnglish: '',
      videos: [],
      photo: [],
      imgCrop: '',
    });

    const equipmentsTmp = [...equipments];
    equipmentsTmp.forEach(equipment => {
      equipment.checked = false;
    });
    setEquipments(equipmentsTmp);

    const ratePlansTmp = [...ratePlans];
    ratePlansTmp.forEach(ratePlan => {
      ratePlan.checked = false;
    });
    setEquipments(ratePlansTmp);

    setPhotoSortie([]);
    setPreviewSortie([]);
  };

  const removePhoto = (indexPhoto) => {
    const photoSortieTmp = [...photoSortie];
    photoSortieTmp.splice(indexPhoto, 1);
    setPhotoSortie(photoSortieTmp);

    const previewSortieTmp = [...previewSortie];
    previewSortieTmp.splice(indexPhoto, 1);
    setPreviewSortie(previewSortieTmp);
  };

  const addCropedImage = useCallback((cropedImage) => {
    setRoomType((roomType) => ({ ...roomType, imgCrop: cropedImage }));
  }, []);
  const handleClose = () => {
    setOpen(false);
    
    const equipmentsTemp = [ ...equipments ];
    equipmentsTemp.forEach(equipment => {
      equipment.checked = false
    });
    setEquipments(equipmentsTemp);

    const ratePlansTemp = [ ...ratePlans ];
    ratePlansTemp.forEach(ratePlan => {
      ratePlan.checked = false;
    });
    setRatePlans(ratePlansTemp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setRoomType((roomType) => ({ ...roomType, [name]: value }));
    // validate({ [name]: value });
    // formIsValid({
    //   ...accessRight,
    //   [name]: value,
    // });
  };

  const getListEquipments = () => {
    fetchListEquipments()
    .then(result => {
      const equipmentsTemp = [ ...result.data.data ];
      equipmentsTemp.forEach(equipment => {
        equipment.checked = false
      });
      setEquipments(equipmentsTemp);
    })
    .catch(err => console.error(err));
  };

  const getListRatePlans = () => {
    fetchListRatePlans({
      tableName: 'tarif',
      valuesToSearch: [],
      fieldsToPrint: ['_id', 'nom'],
      nbContent: 1000,
      numPage: 1,
    })
    .then(result => {
      const ratePlansTemp = [];
      result.data.list.forEach(({ _id, nom, }) => {
        ratePlansTemp.push({
          _id,
          name: nom,
          checked: false,
        });
      });
      setRatePlans(ratePlansTemp);
    })
    .catch(err => console.error(err))
  };

  const getInfoRoomType = () => {
    getRoomType(roomTypeId)
    .then(result => {
      if (result.data.status === 200) {
        const {
          nom, 
          nbAdulte, 
          nbEnfant, 
          name, 
          desc, 
          photo, 
          chambreTotal,
          etage,
          superficie,
          description,
          equipements,
          planTarifaire,
          videos,
          photoCrop,
        } = result.data.typeChambre;
        setRoomType({
          nameInFrench: nom,
          nameInEnglish: name,
          numberOfRoom: chambreTotal,
          areaSize: superficie,
          stageNumber: etage,
          adultNumber: nbAdulte,
          childNumber: nbEnfant,
          descriptionInFrench: description,
          descriptionInEnglish: desc,
          videos,
          photo,
          imgCrop: photoCrop,
        });
        setRatePlans(planTarifaire);
        setEquipments(equipements);
        setPhotoSortie(photo);

        const previewTmp = [];
        photo.forEach((preview) => {
          previewTmp.push(`${config.host}/${preview}`);
        });
        setPreviewSortie(previewTmp);
      }
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    if (open) {
      getInfoRoomType();
    }
  },[open]);

  useEffect(() => {
    if (roomTypeId) return;
    getListEquipments();
    getListRatePlans();
  }, []);

  const addRoomType = () => {
    const equipmentsId = [];
    equipments.forEach(equipment => {
      if (equipment.checked) {
        equipmentsId.push(equipment._id);
      }
    });

    const ratePlansId = [];
    ratePlans.forEach(ratePlan => {
      if (ratePlan.checked) {
        ratePlansId.push(ratePlan._id);
      }
    });

    const payload = {
      toSend: {
        nom: roomType.nameInFrench,
        name: roomType.nameInEnglish,
        chambreTotal: roomType.numberOfRoom,
        superficie: roomType.areaSize,
        etage: roomType.stageNumber,
        nbAdulte: roomType.adultNumber,
        nbEnfant: roomType.childNumber,
        description: roomType.descriptionInFrench,
        desc: roomType.descriptionInEnglish,
        imgCrop: output,
        photo: photoSortie, 
        equipements: equipmentsId,
        planTarifaire: ratePlansId, 
        videos: [],
      }
    };
    createRoomType(payload)
    .then(result => {
      if (result.data.status === 200) {
        setOpen(false);
        clearForm();
        reload();
      } else {
        console.error("Une erreur s'est produite");
      }
    })
    .catch(err => console.error(err));
  };

  const sendUpdateRoomType = () => {
    const equipmentsId = [];
    equipments.forEach(equipment => {
      if (equipment.checked) {
        equipmentsId.push(equipment._id);
      }
    });

    const ratePlansId = [];
    ratePlans.forEach(ratePlan => {
      if (ratePlan.checked) {
        ratePlansId.push(ratePlan._id);
      }
    });

    const payload = {
      toSend: {
        _id: roomTypeId,
        nom: roomType.nameInFrench,
        name: roomType.nameInEnglish,
        chambreTotal: roomType.numberOfRoom,
        superficie: roomType.areaSize,
        etage: roomType.stageNumber,
        nbAdulte: roomType.adultNumber,
        nbEnfant: roomType.childNumber,
        description: roomType.descriptionInFrench,
        desc: roomType.descriptionInEnglish,
        photo: photoSortie, 
        equipements: equipmentsId,
        planTarifaire: ratePlansId, 
        videos: [],
      },
      imgCrop: {
        imageCrop: roomType.imgCrop,
        isModifPhoto: false,
      }
    };
    updateRoomType(payload)
    .then(result => {
      console.log(result);
      if (result.data.status === 200) {
        setOpen(false);
        reload();
      } else {
        console.error("Une erreur s'est produite");
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={'xl'}>
        <CustomizedDialogTitle text={isUpdate ? "Modifier un type chambre" : "Ajouter un nouveau type de chambre"} />

        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomizedInput
              placeholder="nom"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="nom"
              name="nameInFrench"
              label="Nom"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.nameInFrench}
            />
            <CustomizedInput
              placeholder="name"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="name"
              name="nameInEnglish"
              label="Name"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.nameInEnglish}
            />
          </Stack>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomizedInput
              placeholder="Nombre de chambre"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="nombre_de_chambre"
              name="numberOfRoom"
              label="Nombre de chambre"
              type="number"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.numberOfRoom}
            />
            <CustomizedInput
              placeholder="Superficie"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="superficie"
              name="areaSize"
              label="Superficie"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.areaSize}
            />
            <CustomizedInput
              placeholder="nombre d'étage"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="etage"
              name="stageNumber"
              label="Nombre d'étage"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.stageNumber}
            />
          </Stack>
          <h4>Occupation</h4>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomizedInput
              placeholder="nombre d'adulte"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="nombre_adulte"
              name="adultNumber"
              label="Nombre d'adulte"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.adultNumber}
            />
            <CustomizedInput
              placeholder="nombre d'enfant"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="nombre_enfant"
              name="childNumber"
              label="Nombre d'enfant"
              type="text"
              fullWidth
              required
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.childNumber}
            />
          </Stack>
          <h4>Description</h4>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <CustomizedInput
              placeholder="description"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="description"
              name="descriptionInFrench"
              label="Description"
              type="text"
              fullWidth
              required
              multiline
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.descriptionInFrench}
            />
            <CustomizedInput
              placeholder="description en anglais"
              onChange={handleChange}
              error={false}
              margin="dense"
              id="description_anglais"
              name="descriptionInEnglish"
              label="Description en anglais"
              type="text"
              fullWidth
              required
              multiline
              {...(errors.id && {
                error: true,
                helpertext: errors.id,
              })}
              value={roomType.descriptionInEnglish}
            />
          </Stack>
          <Equipments
            equipments={equipments}
            setEquipments={setEquipments}
          />
          <RatePlans
            ratePlans={ratePlans}
            setRatePlans={setRatePlans}
          />
          <h4>Choisir une image pour l'aperçu de la chambre</h4>
          <Stack sx={{ p: 2 }} direction="row" spacing={2}>
            <AddImageCrop 
              addCropedImage={addCropedImage}
              output={output}
              setOutput={setOutput}
              imgCrop={roomType.imgCrop}
            />
          </Stack>
          <h4>Images de la chambre</h4>
          <div>
            {
              previewSortie.map((preview, i) => (
                <Stack sx={{ position: 'relative' }}>
                  <img className={styles.photoRoom} key={preview} src={preview} alt="chambre" />
                  <CancelIcon
                    sx={{
                      color: 'red',
                      position: 'absolute',
                      top: 10,
                      right: 183,
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => removePhoto(i)}
                  />
                </Stack>
              ))
            }
          </div>
          
          <Stack sx={{ p: 2 }} direction="row" spacing={2}>
            <CustomizedButton text={`Choisir à partir de la gallerie`} onClick={() => setShowGalerie(true)} component={RouterLink} to="#"/>
            <CustomizedButton text={`Uploader une image`} component={RouterLink} to="#"/>
          </Stack>
          <Galerie 
            showGalerie={showGalerie} 
            setShowGalerie={setShowGalerie}
            photoSortie={photoSortie}
            setPhotoSortie={setPhotoSortie}
            previewSortie={previewSortie}
            setPreviewSortie={setPreviewSortie}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#E8F0F8', height: '150px' }}>
          <Button onClick={handleClose}>Annuler</Button>
          <CustomizedButton onClick={isUpdate ? sendUpdateRoomType : addRoomType} text={`Valider`} component={RouterLink} to="#" />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoomTypeForm;
