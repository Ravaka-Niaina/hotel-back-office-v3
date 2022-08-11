import { Stack, Button } from '@mui/material';
import ReactCrop from 'react-image-crop';
import { useDropzone } from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css';
import { useCallback, useEffect, useState } from 'react';
//
const TestSideBar = () => {
  
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [output, setOutput] = useState(null);

  const onDrop = useCallback((acceptedFile) => {
    acceptedFile.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // setB64(reader.result);
        setSrc(URL.createObjectURL(file));
      };
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    console.log(src);
  }, [src]);

  useEffect(() => {
    // console.log(crop);
  }, [crop]);

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
    console.log(base64Image);
    setOutput(base64Image);
  };

  return (
    <Stack minHeight="100vh" display={'flex'} alignItems="center" justifyContent="center">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      {src && (
        <div>
          <ReactCrop ruleOfThirds maxWidth={'60%'} aspect={undefined} crop={crop} onChange={(c) => setCrop(c)}>
            <img
              src={src}
              alt="img"
              onLoad={(e) => {
                setImage(e.target);
              }}
            />
          </ReactCrop>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              cropImageNow(image);
            }}
          >
            Crop
          </Button>
          <div>{output && <img src={output} alt="image_croped" />}</div>
        </div>
      )}
    </Stack>
  );
};
export default TestSideBar;
