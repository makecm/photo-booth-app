import { useEffect, useState } from "react";

import { useAppState } from '../../providers/appState'

export function usePreviewSize(previewRef) {
  const [calcSize, setCalcSize] = useState(null)

  const {
    previewSize,
  } = useAppState()

  useEffect(() => {
    function fitPreview() {
      const pixelH = previewSize.height,
        pixelW = previewSize.width,
        containerH = previewRef.current.clientHeight,
        containerW = previewRef.current.clientWidth,
        heightRatio = containerH / pixelH,
        widthRatio = containerW / pixelW,
        fitZoom = Math.min(heightRatio, widthRatio)

      setCalcSize({
        pixelW: pixelW,
        pixelH: pixelH,
        fitZoom: fitZoom,
      })
    } fitPreview()

    window.onresize = resize;

    function resize() {
      fitPreview()
    }
  }, [previewSize, previewRef])

  return calcSize
}
