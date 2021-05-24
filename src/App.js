import { useEffect } from 'react';
import { isMobile } from "react-device-detect";

import './App.css';

import { useAppState } from "./providers/appState";
import { make } from "./make/client"

import { ReactComponent as Icon } from './assets/icon.svg'
import Uploader from './components/Uploader';
import Preview from './components/Preview';
import Spinner from './components/Uploader/spinner'

function App() {
  const {
    imageUrl,
    setImageUrl,
    previewSize,
    setProgress,
    isGenerating,
    setIsGenerating,
    generatedAvatar,
    setGeneratedAvatar,
  } = useAppState();

  const startAgain = () => {
    setImageUrl(null);
    setProgress(null);
    setGeneratedAvatar(null);
  };

  useEffect(() => {
    if (imageUrl !== null) {
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
          photo: imageUrl,
        }
      };

      make(data)
        .then((response) => {
          console.log(response.data.resultUrl)
          setGeneratedAvatar(response.data.resultUrl);
          setIsGenerating(false);
        })
        .catch((error) => {
          console.log(error);
          setIsGenerating(false);
        });
    }
  }, [imageUrl]);

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

        {!imageUrl && (<Uploader />)}
        <Preview />

        {imageUrl && (
          <div className="controlPanel">
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
