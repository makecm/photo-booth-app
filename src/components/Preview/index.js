import React, { useRef } from 'react';
import { useAppState } from "../../providers/appState";
import usePreviewSize from "./usePreviewSize"
import './styles.css'
import { ReactComponent as Icon } from '../../assets/icon.svg'
import Shapes from './Shapes'

const Preview = () => {
  const {
    transformedImage,
  } = useAppState();

  const previewRef = useRef(null)
  const size = usePreviewSize(previewRef)

  const calcStyles = {
    width: size && size.pixelW + 'px',
    height: size && size.pixelH + 'px',
    transform: size && `scale(${size.fitZoom}) translate(-50%, -50%)`,
    transformOrigin: '0 0',
    top: '50%',
    left: '50%',
    filter: transformedImage ? 'blur(0)' : 'blur(30px)',
    transition: 'all ease 0.3s',
  }

  return (
    <div className={`inner ${transformedImage ? 'uploaded' : 'blank'}`} ref={previewRef}>
    <div className="Preview" style={calcStyles}>
      <Icon />
      <div className="preview-container">
        {transformedImage && <img alt="avatar" src={transformedImage} />}
      </div>
      <Shapes />
    </div>
    </div>
  )
}

export default Preview;
