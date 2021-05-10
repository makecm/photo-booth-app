import React from 'react';
import { useAppState } from "../../providers/appState";
import './styles.css'
import { ReactComponent as Icon } from '../../assets/icon.svg'
import Shapes from './Shapes'

const Preview = ({ style }) => {
  const {
    transformedImage,
  } = useAppState();

  return (
    <div className="Preview" style={style}>
      <Icon />
      {transformedImage && <img alt="avatar" src={transformedImage} />}
      <Shapes />
    </div>
  )
}

export default Preview;
