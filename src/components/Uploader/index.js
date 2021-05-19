import React from "react";
import axios from "axios";
import './styles.css';
import { useAppState } from "../../providers/appState";

import Spinner from './spinner'

const Uploader = ({ label }) => {
  const {
    setImageUrl,
    isUploading,
    setIsUploading,
    progressIncrement,
    setProgress,
  } = useAppState();

  const getBase64Image = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      let width = "";
      let height = "";

      const MAX_WIDTH = 1600;
      const MAX_HEIGHT = 1600;

      const img = new Image();

      img.style.imageOrientation = "from-image";

      img.src = event.target.result;

      img.onload = () => {
        width = img.width;
        height = img.height;

        if (width / MAX_WIDTH > height / MAX_HEIGHT) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        canvas.style.imageOrientation = "from-image";
        ctx.fillStyle = "rgba(255,255,255,0.0)";
        ctx.fillRect(0, 0, 700, 600);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(img, 0, 0, width, height);

        const data = ctx.canvas.toDataURL("image/jpeg");
        callback(data);
      };
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const onInputChange = (event) => {
    setIsUploading(true);

    for (const file of event.target.files) {
      const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

      getBase64Image(file, (base64Value) => {
        const data = {
          upload_preset: uploadPreset,
          file: base64Value,
        };

        const config = {
          onUploadProgress: function (progressEvent) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress);
          },
        };

        axios
          .post(url, data, config)
          .then((response) => {

            setIsUploading(false);
            setImageUrl(imagePosition(response.data.url));
          })

          .catch((error) => {
            console.log(error);
            setIsUploading(false);
          });
      });
    }
  };

  const imagePosition = (url) => {
    const arr = new URL(url).href.split("/");
    const transformation = 'w_1080,h_1080,c_thumb,g_face/w_1000';
    console.log('hey')

    arr.splice(6, 0, transformation)
    const joinedArr = arr.join('/')

    return joinedArr
  };

  return (
    <>
      <div className="Uploader" disabled={isUploading}>
        <input
          type="file"
          id="fileupload"
          accept="image/*"
          onChange={onInputChange}
          title="Upload your Photo"
          disabled={isUploading}
        />
        <label
          htmlFor="fileupload"
          style={{
            background: `linear-gradient(90deg, #4C51BF ${progressIncrement}%, #667EEA ${progressIncrement}%)`
          }}
        >
          <span
            className="upload"
            style={{
              transform: isUploading && 'translateY(300%)'
            }}
          >
            {label}
          </span>
          <span
            className="uploading"
            style={{
              top: isUploading ? '0' : '-180%'
            }}
          >
            Uploading
              <Spinner styles={{
              marginLeft: '1rem'
            }} />
          </span>
        </label>
      </div>
    </>
  );
}

export default Uploader;
