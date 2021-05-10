import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { isMobile } from "react-device-detect";
import './App.css';
import { useAppState } from "./providers/appState";

import { ReactComponent as Icon } from './assets/icon.svg'

import Uploader from './components/Uploader';
import Preview from './components/Preview';
import Switcher from './components/Switcher';
import Spinner from './components/Uploader/spinner'

function App() {
  const {
    imageUrl,
    setPreviewSize,
    previewSize,
    setTransformedImage,
    transformedImage,
    setImageUrl,
    setProgress,
    isGenerating,
    setIsGenerating,
    generatedAvatar,
    setGeneratedAvatars,
    makeAPIKey,
    makeTemplateURL,
    sizes,
  } = useAppState();

  const [size, setSize] = useState(null);
  const previewRef = useRef(null)

  useEffect(() => {
    const pixelH = previewSize.height,
      pixelW = previewSize.width,
      containerH = previewRef.current.clientHeight,
      containerW = previewRef.current.clientWidth,
      heightRatio = containerH / pixelH,
      widthRatio = containerW / pixelW,
      fitZoom = Math.min(heightRatio, widthRatio)

    setSize({
      pixelW: pixelW,
      pixelH: pixelH,
      fitZoom: fitZoom,
    })
  }, [previewRef, previewSize, imageUrl])

  useEffect(() => {
    const imagePosition = (size, url) => {
      const arr = new URL(url).href.split("/");
      let transformation = '';

      switch(size.key) {
        case 0:
          transformation = 'w_1080,h_1080,c_thumb,g_face/w_1000'
          break;
        case 1:
          transformation = 'w_1080,h_1920,c_thumb,g_face/w_1000'
          break;
        default:
          transformation = 'w_1320,h_691,c_thumb,g_face/w_1000'
      }
      arr.splice(6, 0, transformation)
      const joinedArr = arr.join('/')

      setTransformedImage(joinedArr)
    };

    imageUrl && imagePosition(previewSize, imageUrl)
  }, [imageUrl, previewSize, setTransformedImage])

  const startAgain = () => {
    setImageUrl(null);
    setPreviewSize(sizes[0]);
    setTransformedImage(null);
    setProgress(null);
    setGeneratedAvatars(null);
  };

  useEffect(() => {
    if (transformedImage !== null) {
      const generateAvatar = () => {
        setIsGenerating(true);

        const url = `${makeTemplateURL}`;

        const headers = {
          'Content-Type': 'application/json',
          'X-MAKE-API-KEY': `${makeAPIKey}`
        }

        const data = {
          customSize: {
            width: previewSize.width,
            height: previewSize.height,
            unit: 'px',
          },
          format: "png",
          fileName: "image",
          contentDisposition: isMobile ? "inline" : "attachment",
          data: {
            photo: transformedImage,
          }
        };

        axios.post(url, data, {
          headers: headers
        })
          .then((response) => {
            console.log(response)
            const generatedAvatars = response.data.resultUrl;
            setGeneratedAvatars(generatedAvatars);
            setIsGenerating(false);
          })
          .catch((error) => {
            console.log(error);
            setIsGenerating(false);
          });
      };
      generateAvatar();
    }
  }, [imageUrl, transformedImage, makeAPIKey, makeTemplateURL, setGeneratedAvatars, setIsGenerating, previewSize]);

  return (
    <div className="App">
      <header>
        <div>
          <Icon />
          <h1>React Photo Booth</h1>
        </div>
        {imageUrl && (
        <button
          className="reset"
          onClick={function () {
            startAgain();
          }}>
          Try Again
        </button>
      )}
      </header>
      <div className="container" ref={previewRef}>
        <Uploader label="Upload your photo" />
        <div className="inner">
          <Preview
            style={{
              width: size && size.pixelW + 'px',
              height: size && size.pixelH + 'px',
              transform: size && `scale(${size.fitZoom}) translate(-50%, -50%)`,
              transformOrigin: '0 0',
              top: '50%',
              left: '50%',
              filter: imageUrl ? 'blur(0)' : 'blur(30px)',
              transition: 'all ease 0.3s',
            }}
          />
        </div>
        {imageUrl && (
          <div className="controlPanel">
            <Switcher />
            <a
              className={`download ${isGenerating ? 'disabled' : 'false'}`}
              target="_blank"
              rel="noreferrer noopener"
              href={generatedAvatar && generatedAvatar}
            >
              {isGenerating && (
                <Spinner styles={{ marginRight: '1rem' }} size="small" />
              )}
              {isGenerating ? "Generating..." : "Download"}

            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
