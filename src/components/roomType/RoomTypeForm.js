import React, { useState, useEffect, useCallback, useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Stack, Button, Dialog, DialogActions, DialogContent, Checkbox } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// components
import { createRoomType, fetchListEquipments, fetchListRatePlans, getRoomType, updateRoomType } from '../../services/RoomType';
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

import { fetchListLanguages } from '../../services/Common';
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
    names: {},
    numberOfRoom: '',
    areaSize: '',
    stageNumber: '',
    adultNumber: '',
    childNumber: '',
    descriptions: {},
    videos: [],
    photo: [],
    imgCrop: '',
  });
  const [errors, setErrors] = useState({
    names: '',
    numberOfRoom: '',
    areaSize: '',
    stageNumber: '',
    adultNumber: '',
    childNumber: '',
    descriptions: '',
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
  
  const [languages, setLanguages] = useState([]);

  const [tabDescriptionValue, setTabDescriptionValue] = useState(0);
  const [choosedDescriptionLanguageAbbrev, setChoosedDescriptionLanguageAbbrev] = useState('');
  
  const [tabNameValue, setTabNameValue] = useState(0);
  const [choosedNameLanguageAbbrev, setChoosedNameLanguageAbbrev] = useState('');

  const clearForm = () => {
    const languagesAbbrev = Object.keys(roomType.names);
    const emptyNames = {};
    languagesAbbrev.forEach((abbrev) => {
      emptyNames[abbrev] = '';
    });
    setRoomType({
      names: {...emptyNames},
      numberOfRoom: '',
      areaSize: '',
      stageNumber: '',
      adultNumber: '',
      childNumber: '',
      descriptions: {...emptyNames},
      videos: [],
      photo: [],
      imgCrop: '',
    });

    setErrors({
      names: '',
      numberOfRoom: '',
      areaSize: '',
      stageNumber: '',
      adultNumber: '',
      childNumber: '',
      descriptions: '',
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

  const addCropedImage = (cropedImage) => {
    setRoomType((roomType) => ({ ...roomType, imgCrop: cropedImage }));
  };
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

  const handleChangeNameValue = (e) => {
    const tempRoomType = { ...roomType};
    tempRoomType.names[choosedNameLanguageAbbrev] = e.target.value;
    setRoomType(tempRoomType);

    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        names: 'Il manque un ou plusieurs noms',
      });
    } else if (errors.names) {
      setErrors({
        ...errors,
        names: '',
      });
    }
  };

  const handleChangeDescriptionValue = (e) => {
    const tempRoomType = { ...roomType};
    tempRoomType.descriptions[choosedDescriptionLanguageAbbrev] = e.target.value;
    setRoomType(tempRoomType);

    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        descriptions: 'Il manque une ou plusieurs descriptions',
      });
    } else if (errors.descriptions) {
      setErrors({
        ...errors,
        descriptions: '',
      });
    }
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
      fieldsToPrint: ['_id', 'names.fr'],
      nbContent: 1000,
      numPage: 1,
    })
    .then(result => {
      const ratePlansTemp = [];
      result.data.list?.forEach(({ _id, names, }) => {
        ratePlansTemp.push({
          _id,
          names,
          checked: false,
        });
      });
      setRatePlans(ratePlansTemp);
    })
    .catch(err => console.error(err))
  };

  const getListLanguages = () => {
    fetchListLanguages()
    .then(result => {
      console.log(result.data);
      setLanguages(result.data?.listLanguages);
      const tempLanguagesContent = {};
      result.data.listLanguages.forEach(language => {
        tempLanguagesContent[language.abbrev] = '';
      });
      setRoomType({
        ...roomType,
        names: {...tempLanguagesContent},
        descriptions: {...tempLanguagesContent},
      });
      setChoosedDescriptionLanguageAbbrev(result.data.listLanguages[0].abbrev);
      setChoosedNameLanguageAbbrev(result.data.listLanguages[0].abbrev);
    });
  };

  const getMissingLanguages = useCallback(async (names, descriptions) => {
    const result = await fetchListLanguages();
    setLanguages(result.data.listLanguages);
    const tempLanguagesContent = {};
    result.data.listLanguages.forEach(language => {
      tempLanguagesContent[language.abbrev] = '';
    });

    const tempNames = {...tempLanguagesContent};
    const tempDescriptions = {...tempLanguagesContent};

    if (!names || !descriptions) {
      return { names: tempNames, descriptions: tempDescriptions };
    }

    const languagesAbbrevForName = Object?.keys(names);
    languagesAbbrevForName.forEach(languageAbbrev => {
      tempNames[languageAbbrev] = names[languageAbbrev];
    });
    
    const languagesAbbrevForDesc = Object?.keys(descriptions);
    languagesAbbrevForDesc.forEach(languageAbbrev => {
      tempDescriptions[languageAbbrev] = descriptions[languageAbbrev];
    });

    setChoosedDescriptionLanguageAbbrev(result.data.listLanguages[0].abbrev);
    setChoosedNameLanguageAbbrev(result.data.listLanguages[0].abbrev);

    return { names: tempNames, descriptions: tempDescriptions };
  }, [roomType]);

  const getInfoRoomType = () => {
    getRoomType(roomTypeId)
    .then(result => {
      if (result.data.status === 200) {
        const {
          names, 
          nbAdulte, 
          nbEnfant, 
          photo, 
          chambreTotal,
          etage,
          superficie,
          descriptions,
          equipements,
          planTarifaire,
          videos,
          photoCrop,
        } = result.data.typeChambre;
        getMissingLanguages(names, descriptions)
        .then(({ names, descriptions }) => {
          setRoomType({
            names,
            numberOfRoom: chambreTotal,
            areaSize: superficie,
            stageNumber: etage,
            adultNumber: nbAdulte,
            childNumber: nbEnfant,
            descriptions,
            videos,
            photo,
            imgCrop: photoCrop[0],
          });
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
    getListLanguages();
  }, []);

  const getClearedErrors = () => ({
      names: '',
      numberOfRoom: '',
      areaSize: '',
      stageNumber: '',
      adultNumber: '',
      childNumber: '',
      descriptions: '',
      videos: '',
      photo: '',
      imgCrop: '',
    });

  const setExistingErrors = (errors) => {
    const correspondence = {
      names: 'names',
      chambreTotal: 'numberOfRoom',
      superficie: 'areaSize',
      etage: 'stageNumber',
      nbAdulte: 'adultNumber',
      nbEnfant: 'childNumber',
      descriptions: 'descriptions',
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
    const languagesAbbrev = Object.keys(roomType.names);
    for (let i = 0; i < languagesAbbrev.length; i += 1) {
      if (roomType.names[languagesAbbrev[i]] === '') {
        context.changeResultErrorMessage("Vous avez oublié de donner le nom pour un ou plusieurs languages");
        context.showResultError(true);
        return false;
      }
    }

    for (let i = 0; i < languagesAbbrev.length; i += 1) {
      if (roomType.descriptions[languagesAbbrev[i]] === '') {
        context.changeResultErrorMessage("Vous avez oublié de donner la description pour un ou plusieurs languages");
        context.showResultError(true);
        return false;
      }
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
        names: roomType.names,
        chambreTotal: roomType.numberOfRoom,
        superficie: roomType.areaSize,
        etage: roomType.stageNumber,
        nbAdulte: roomType.adultNumber,
        nbEnfant: roomType.childNumber,
        descriptions: roomType.descriptions,
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
        names: roomType.names,
        chambreTotal: roomType.numberOfRoom,
        superficie: roomType.areaSize,
        etage: roomType.stageNumber,
        nbAdulte: roomType.adultNumber,
        nbEnfant: roomType.childNumber,
        descriptions: roomType.descriptions,
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
        setExistingErrors(result.data.errors);
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
  const removePreviewedImage = () => {
    setRoomType({
      ...roomType,
      imgCrop: null,
    });
    setPreviewedImage(null);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChangeLanguage = (event: React.SyntheticEvent, newValue: number) => {
    setTabDescriptionValue(newValue);
    setChoosedDescriptionLanguageAbbrev(Object.keys(roomType.descriptions)[newValue]);
  };

  const handleChangeTabNameValue = (event: React.SyntheticEvent, newValue: number) => {
    setTabNameValue(newValue);
    setChoosedNameLanguageAbbrev(Object.keys(roomType.names)[newValue]);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
        <CustomizedDialogTitle text={isUpdate ? "Modifier un type chambre" : "Ajouter un nouveau type de chambre"} />
        <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
          <CustomizedTitle text='Informations chambre' size={18} level={0} />
          <CustomizedTitle text='Nom' size={18} level={0} />
          <Stack sx={{ p: 2 }} direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabNameValue} 
                onChange={handleChangeTabNameValue} 
                aria-label="basic tabs example"
              >
                {languages?.map((language, index) => 
                  <Tab key={language.abbrev} label={language.name} {...a11yProps(index)} />
                )}
              </Tabs>
            </Box>
          </Stack>
          <CustomizedInput
            sx={{marginLeft: '16px'}}
            placeholder="nom"
            onChange={handleChangeNameValue}
            error={false}
            margin="dense"
            id="nom"
            name="nameInFrench"
            type="text"
            fullWidth
            required
            {...(errors.names && {
              error: true,
              helpertext: errors.names,
            })}
            value={roomType.names?.[choosedNameLanguageAbbrev]}
          />
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabDescriptionValue} 
                onChange={handleChangeLanguage} 
                aria-label="basic tabs example"
              >
                {languages.map((language, index) => 
                  <Tab key={language.abbrev} label={language.name} {...a11yProps(index)} />
                )}
              </Tabs>
            </Box>
          </Stack>
          <CustomizedInput
              sx={{marginLeft: '16px'}}
              placeholder="description"
              onChange={handleChangeDescriptionValue}
              error={false}
              margin="dense"
              id="description"
              name="descriptions"
              // label="Description"
              type="text"
              fullWidth
              required
              multiline
              {...(errors.descriptions && {
                error: true,
                helpertext: errors.descriptions,
              })}
              value={roomType.descriptions?.[choosedDescriptionLanguageAbbrev]}
            />
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
