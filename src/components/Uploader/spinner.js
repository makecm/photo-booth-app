import React from "react";

export default function Spinner({ size, styles }) {
  return (
    <div
      className={`${size === 'small' ? 'small' : ''} Spinner`}
      style={styles}
    />
  );
}
