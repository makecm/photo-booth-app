import React from 'react';
import { useAppState } from "../../providers/appState";
import './styles.css';

const Switcher = () => {
  const {
    sizes,
    setPreviewSize,
  } = useAppState();

  return (
    <div className="Switcher">
    <select
      onChange={e => setPreviewSize(sizes[e.target.value])}
    >
      {sizes.map((size)=> (
        <option
          value={size.key}
          key={size.key}
        >
          {size.text}
        </option>
      ))}
    </select>
    </div>
  )
}

export default Switcher;
