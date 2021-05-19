import React, { useRef } from 'react';

import './styles.css'

import { useAppState } from "../../providers/appState";
import { usePreviewSize } from "./usePreviewSize"

import { ReactComponent as Icon } from '../../assets/icon.svg'
import Shapes from './Shapes'

const Preview = () => {
  const {
    imageUrl,
  } = useAppState();

  const previewRef = useRef(null)
  const size = usePreviewSize(previewRef)

  const calcStyles = {
    width: size && size.pixelW + 'px',
    height: size && size.pixelH + 'px',
    transform: size && `scale(${size.fitZoom}) translate(-50%, -50%)`,
    filter: imageUrl ? 'blur(0)' : 'blur(30px)',
  }

  return (
    <div className={`inner ${imageUrl ? 'uploaded' : 'blank'}`} ref={previewRef}>
    <div className="Preview" style={calcStyles}>
      <Icon />
      <div className="preview-container">
        {imageUrl && <img alt="avatar" src={imageUrl} />}
      </div>
      <Shapes />
    </div>
    </div>
  )
}

export default Preview;
