import React, { createContext, useState, useContext } from "react";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  // Sizes
  const sizes = [
    {
      key: 0,
      text: "Instagram Post",
      width: 1080,
      height: 1080,
    },
    {
      key: 1,
      text: "Instagram Story",
      width: 1080,
      height: 1920
    },
    {
      key: 2,
      text: "Facebook, Linkedin, Twitter",
      width: 1320,
      height: 621
    }
  ]

  const [imageUrl, setImageUrl] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progressIncrement, setProgress] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAvatar, setGeneratedAvatars] = useState(null);
  const [previewSize, setPreviewSize] = useState(sizes[0]);

  // Enter your Cloudinary UploadPreset and CloudName here to enable uploading to your cloudinary bucket.
  const cloudinaryUploadPreset = "uncm2kav";
  const cloudinaryCloudName = "outfitio";

  // Enter your Make API key and Template URL here
  const makeAPIKey = "47bad936bfb6bb3bd9b94ae344132f8afdfff44c";
  const makeTemplateURL = "https://api.make.cm/make/t/0f98d3b9-32dc-4366-8767-fbbdec97ad54/sync";

  const value = {
    imageUrl,
    setImageUrl,
    transformedImage,
    setTransformedImage,
    isUploading,
    setIsUploading,
    progressIncrement,
    setProgress,
    isGenerating,
    setIsGenerating,
    generatedAvatar,
    setGeneratedAvatars,
    previewSize,
    setPreviewSize,
    cloudinaryUploadPreset,
    cloudinaryCloudName,
    makeAPIKey,
    makeTemplateURL,
    sizes,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      "You probably forgot a <AppStateProvider> context provider!"
    );
  }
  return context;
}
