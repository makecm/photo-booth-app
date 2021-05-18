import { useEffect } from 'react';
import { isMobile } from "react-device-detect";

import './App.css';
import { useAppState } from "./providers/appState";

import make from "./make/client"

import { ReactComponent as Icon } from './assets/icon.svg'
import Uploader from './components/Uploader';
import Preview from './components/Preview';
import Switcher from './components/Switcher';
import Spinner from './components/Uploader/spinner'

function App() {
  const {
    imageUrl,
    setImageUrl,
    setPreviewSize,
    previewSize,
    setTransformedImage,
    transformedImage,
    setProgress,
    isGenerating,
    setIsGenerating,
    generatedAvatar,
    setGeneratedAvatars,
    sizes,
  } = useAppState();

  useEffect(() => {
    const imagePosition = (size, url) => {
      const arr = new URL(url).href.split("/");
      let transformation = '';

      switch (size.key) {
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

        make(data)
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
  }, [transformedImage, setGeneratedAvatars, setIsGenerating, previewSize]);

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
      <div className="container">
        <Uploader label="Upload your photo" />
        <Preview />
        {transformedImage && (
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
