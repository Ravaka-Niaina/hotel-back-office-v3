import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
//
const TestSideBar = () => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  useEffect(() => {
    console.log(src);
  }, [src]);
  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  const cropImageNow = () => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
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
    <div className="App">
      <center>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            selectImage(e.target.files[0]);
          }}
        />
        <br />
        <br />
        <div>
          {src && (
            <div>
              <ReactCrop ruleOfThirds aspect={undefined} crop={crop} onChange={(c) => setCrop(c)}>
                <img
                  src={src}
                  onLoad={(e) => {
                    setImage(e.target);
                  }}
                  alt="imagehere"
                />
              </ReactCrop>
              <br />
              <Button onClick={cropImageNow}>Crop</Button>
              <br />
              <br />
            </div>
          )}
        </div>
        <div>{output && <img src={output} alt="alt" />}</div>
      </center>
    </div>
  );
};
export default TestSideBar;
