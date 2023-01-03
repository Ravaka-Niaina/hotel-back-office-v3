import React, { useState, useEffect, useCallback, useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Dialog, DialogActions, DialogContent, Checkbox } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// components
import { createRoomType, fetchListEquipments, fetchListRatePlans, getRoomType, updateRoomType, } from '../../services/RoomType';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedTitle from '../CustomizedComponents/CustomizedTitle';
import CustomizedInput from '../CustomizedComponents/CustomizedInput';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import AddImageCrop from './AddImageCrop';
import Galerie from './Galerie';
import Equipments from './Equipments';
import RatePlans from './RatePlans';
import styles from './RoomTypeForm.module.css';
import config from '../../config/api';

import { ThemeContext } from '../context/Wrapper';

const imgCrop = null;
const RoomTypeForm = ({ 
  reload, 
  open,
  setOpen, 
  roomTypeId,
  isUpdate,
  onSubmit,
}) => {
  
  const context = useContext(ThemeContext);
  // const [errors, setErrors] = useState({});
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
  const [errors, setErrors] = useState({
    nameInFrench: '',
    nameInEnglish: '',
    numberOfRoom: '',
    areaSize: '',
    stageNumber: '',
    adultNumber: '',
    childNumber: '',
    descriptionInFrench: '',
    descriptionInEnglish: '',
    videos: '',
    photo: '',
    imgCrop: '',
  });
  const [showGalerie, setShowGalerie] = useState(false);
  const [output, setOutput] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [ratePlans, setRatePlans] = useState([]);
  const [photoSortie, setPhotoSortie] = useState([]);
  const [previewSortie, setPreviewSortie] = useState([]);
  const [previewedImage, setPreviewedImage] = useState(imgCrop ? `${config.host}/${roomType.imgCrop}` : null);

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

    setErrors({
      nameInFrench: '',
      nameInEnglish: '',
      numberOfRoom: '',
      areaSize: '',
      stageNumber: '',
      adultNumber: '',
      childNumber: '',
      descriptionInFrench: '',
      descriptionInEnglish: '',
      videos: '',
      photo: '',
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
    clearForm();
    
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
    setRoomType((roomType) => ({ ...roomType, [name]: value }));
    setErrors({ ...errors, [name]: value.trim() ? '' : 'Ce champ est requis' });
    // validate({ [name]: value });
    // formIsValid({
    //   ...accessRight,
    //   [name]: value, 
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
      result.data.list?.forEach(({ _id, nom, }) => {
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
          imgCrop: photoCrop[0],
        });
        setPreviewedImage(`${config.host}/${photoCrop[0]}`);
        setRatePlans(planTarifaire);
        setEquipments(equipements);
        setPhotoSortie(photo);

        if (photo) {
          const previewTmp = [];
          photo.forEach((preview) => {
            previewTmp.push(`${config.host}/${preview}`);
          });
          setPreviewSortie(previewTmp);
        }
      }
    })
    .catch(err => console.error(err));
  };

  const validateAddRoomType = () => {
    if (onSubmit) {
      onSubmit(addRoomType);
    } else {
      addRoomType();
    }
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

  const getClearedErrors = () => ({
      nameInFrench: '',
      nameInEnglish: '',
      numberOfRoom: '',
      areaSize: '',
      stageNumber: '',
      adultNumber: '',
      childNumber: '',
      descriptionInFrench: '',
      descriptionInEnglish: '',
      videos: '',
      photo: '',
      imgCrop: '',
    });

  const setExistingErrors = (errors) => {
    const correspondence = {
      nom: 'nameInFrench',
      name: 'nameInEnglish',
      chambreTotal: 'numberOfRoom',
      superficie: 'areaSize',
      etage: 'stageNumber',
      nbAdulte: 'adultNumber',
      nbEnfant: 'childNumber',
      description: 'descriptionInFrench',
      desc: 'descriptionInEnglish',
      videos: '',
      photo: 'photo',
      imgCrop: '',
    }
    const clearedErrors = getClearedErrors(); 
    Object.keys(correspondence).forEach((err) => {
      clearedErrors[correspondence[err]] = errors[err];
    });
    setErrors(clearedErrors);
  };

  const validate = () => {
    console.log({
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
      videos: [],
    });
    if (roomType.nameInFrench.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner le nom en français");
      context.showResultError(true);
      return false;
    }

    if (roomType.nameInEnglish.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner le nom en anglais");
      context.showResultError(true);
      return false;
    }

    if (roomType.numberOfRoom.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner le nombre de chambres");
      context.showResultError(true);
      return false;
    }

    if (roomType.areaSize.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner la superficie");
      context.showResultError(true);
      return false;
    }

    if (roomType.stageNumber.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner le nombre d'étages");
      context.showResultError(true);
      return false;
    }

    if (roomType.adultNumber.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner le nombre d'adultes");
      context.showResultError(true);
      return false;
    }

    if (roomType.childNumber.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner le nombre d'enfants");
      context.showResultError(true);
      return false;
    }

    if (roomType.descriptionInFrench.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner la description en français");
      context.showResultError(true);
      return false;
    }

    if (roomType.descriptionInEnglish.trim() === '') {
      context.changeResultErrorMessage("Vous avez oublié de donner la description en anglais");
      context.showResultError(true);
      return false;
    }

    if (output === null) {
      context.changeResultErrorMessage("Vous avez oublié d'ajouter une image pour l'aperçu de la chambre");
      context.showResultError(true);
      return false;
    }
    if (photoSortie.length === 0) {
      context.changeResultErrorMessage("Vous avez oublié de choisir des photos à partir de la galerie");
      context.showResultError(true);
      return false;
    }
    
    return true;
  };

  const addRoomType = () => {
    context.showLoader(true);
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
          context.changeResultSuccessMessage('Enregistrement inséré avec succès');
          context.showResultSuccess(true);
          clearForm();
          reload();
        } else {
          validate()
          setExistingErrors(result.data.errors);
          // context.changeResultErrorMessage("Une erreur interne s'est produite");
          // context.showResultError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        context.changeResultErrorMessage("Une erreur interne s'est produite");
        context.showResultError(true);
      }).finally(() => {
        context.showLoader(false);
      });
  };

  const sendUpdateRoomType = () => {
    context.showLoader(true);
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
        isModifPhoto: true,
      }
    };
    updateRoomType(payload)
    .then(result => {
      if (result.data.status === 200) {
        setOpen(false);
        context.changeResultSuccessMessage('Enregistrement inséré avec succès');
        context.showResultSuccess(true);
        reload();
      } else {
        context.changeResultErrorMessage("Une erreur interne s'est produite");
        context.showResultError(true);
      }
    })
    .catch(() => {
      context.changeResultErrorMessage("Une erreur interne s'est produite");
      context.showResultError(true);
    }).finally(()=>{
      context.showLoader(false);
    });
  };
  console.log(roomType.imgCrop);
  const removePreviewedImage = () => {
    setRoomType({
      ...roomType,
      imgCrop: null,
    });
    setPreviewedImage(null);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
        <CustomizedDialogTitle text={isUpdate ? "Modifier un type chambre" : "Ajouter un nouveau type de chambre"} />

        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <CustomizedTitle text='Informations chambre' size={18} level={0} />
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
              {...(errors.nameInFrench && {
                error: true,
                helpertext: errors.nameInFrench,
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
              {...(errors.nameInEnglish && {
                error: true,
                helpertext: errors.nameInEnglish,
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
              {...(errors.numberOfRoom && {
                error: true,
                helpertext: errors.numberOfRoom,
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
              {...(errors.areaSize && {
                error: true,
                helpertext: errors.areaSize,
              })}
              value={roomType.areaSize}
            />
          </Stack>
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
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
              {...(errors.stageNumber && {
                error: true,
                helpertext: errors.stageNumber,
              })}
              value={roomType.stageNumber}
            />
          </Stack>
          <CustomizedTitle text='Occupation' size={18} level={0} />
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
              {...(errors.adultNumber && {
                error: true,
                helpertext: errors.adultNumber,
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
              {...(errors.childNumber && {
                error: true,
                helpertext: errors.childNumber,
              })}
              value={roomType.childNumber}
            />
          </Stack>
          <CustomizedTitle text='Description' size={18} level={0} />
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
              {...(errors.descriptionInFrench && {
                error: true,
                helpertext: errors.descriptionInFrench,
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
              {...(errors.descriptionInEnglish && {
                error: true,
                helpertext: errors.descriptionInEnglish,
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
          <CustomizedTitle text={`Choisir une image pour l'aperçu de la chambre`} size={18} level={0} />
          <Stack sx={{ p: 2 }} direction="row" spacing={2}>
            <AddImageCrop 
              addCropedImage={addCropedImage}
              output={output}
              setOutput={setOutput}
              imgCrop={roomType.imgCrop}
              removePreviewedImage={removePreviewedImage}
              previewedImage={previewedImage}
              setPreviewedImage={setPreviewedImage}
            />
          </Stack>
          <CustomizedTitle text='Image de la chambre' size={18} level={0} />
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
            {/* <CustomizedButton text={`Uploader une image`} component={RouterLink} to="#"/> */}
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
          <CustomizedButton onClick={isUpdate ? sendUpdateRoomType : validateAddRoomType} text={`Valider`} component={RouterLink} to="#" data-testid="btnValidate" />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoomTypeForm;
