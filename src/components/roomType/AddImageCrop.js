import { Stack, Button, Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import ReactCrop from 'react-image-crop';
import { useDropzone } from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css';
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState, useContext } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CustomizedDialogTitle from '../CustomizedComponents/CustomizedDialogTitle';
import CustomizedButton from '../CustomizedComponents/CustomizedButton';
import { ThemeContext } from '../context/Wrapper';

const maxWidth = 350;
const maxHeight = 350;

const AddImageCrop = ({addCropedImage}) => {
  const context = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  // functions to close and open the dialog of the image crop
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSrc(null);
    setOutput(null);
    setImage(null);
  };
  const removePreviewedImage = () => {
    setPreviewedImage(null);
  };
  const [previewedImage, setPreviewedImage] = useState(null);
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 25,
    y: 25,
    width: maxWidth,
    height: maxHeight,
  });

  const onDrop = useCallback((acceptedFile) => {
    acceptedFile.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      //   reader.onabort = () => console.log('file reading was aborted');
      //   reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // avadika blob leh fichier
        setSrc(URL.createObjectURL(file));
      };
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (src) {
      handleOpen();
    }
  }, [src]);

  const cropImageNow = (imageToCrop) => {
    const canvas = document.createElement('canvas');
    const scaleX = imageToCrop.naturalWidth / imageToCrop.width;
    const scaleY = imageToCrop.naturalHeight / imageToCrop.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      imageToCrop,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    setOutput(base64Image);
  };

  const validateImage = () => {
    context.showLoader(true);
    setPreviewedImage(output);
    addCropedImage(output);
    handleClose();
    context.showLoader(false);
  };
  useEffect(()=>{
    addCropedImage(previewedImage)
  },[previewedImage,addCropedImage])
  return (
    <Stack direction={`column`}>
      <Stack display={'flex'} alignItems="center" justifyContent="center">
        {/* S'il n'y a pas encore d'image */}
        {!previewedImage ? (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Stack
              sx={{
                border: '1px dashed black',
                padding: 2,
                margin: 0,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
              }}
            >
              Glissez une photo ici ou cliquez pour parcourir...
            </Stack>
          </div>
        ) : (
          // Si une image a déjà été sélectionnée
          <Stack sx={{ position: 'relative' }}>
            <img src={previewedImage} alt="previewed_image" />
            <CancelIcon
              onClick={removePreviewedImage}
              sx={{
                color: 'red',
                position: 'absolute',
                top: 5,
                right: 5,
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            />
          </Stack>
        )}
        {/* Fenetre de pop-up ho anleh recadrage anah image */}
        {src && (
          <Dialog open={open} onClose={handleClose} maxWidth={`xl`}>
            <CustomizedDialogTitle text={`Recadrer l'image`} />
            <DialogContent style={{ backgroundColor: '#E8F0F8', paddingTop: 15 }}>
              <Stack direction={`row`} alignItems="center">
                <ReactCrop
                  ruleOfThirds
                  aspect={undefined}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  maxWidth={maxWidth}
                  maxHeight={maxHeight}
                >
                  <img
                    src={src}
                    alt="img"
                    style={{ maxWidth: '500px', maxHeight: '500px' }}
                    onLoad={(e) => {
                      setImage(e.target);
                    }}
                  />
                </ReactCrop>
                <Stack>
                  <KeyboardDoubleArrowRightIcon sx={{ fontSize: '50px' }} />
                </Stack>
                <Stack>
                  {output ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        style={{ width: { maxWidth }, height: { maxHeight }, border: '1px solid black' }}
                        src={output}
                        alt="image_croped"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        minWidth: `${maxWidth}px`,
                        minHeight: `${maxHeight}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed black',
                      }}
                    >
                      Aperçu ici
                    </div>
                  )}
                </Stack>
              </Stack>
              <br />
              <Button
                variant="contained"
                sx={{
                  fontSize: '12px',
                  borderRadius: 0,
                  background: `linear-gradient(270deg, #33647E 0%, #59A2BE 100%);`,
                  width: '100%',
                  mb: 1,
                }}
                onClick={() => {
                  cropImageNow(image);
                }}
              >
                Recadrer l'image
              </Button>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#E8F0F8' }}>
              <CustomizedButton onClick={validateImage} text={`Valider`} />
            </DialogActions>
          </Dialog>
        )}
      </Stack>
    </Stack>
  );
};
AddImageCrop.propTypes = {
  addCropedImage : PropTypes.func
}
export default AddImageCrop;
