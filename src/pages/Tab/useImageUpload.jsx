// useImageUpload.js
import { useState } from 'react';

function useImageUpload() {
  const [images, setImages] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (images.length + files.length > 5) {
        alert('You can only upload up to 5 images.');
        return;
      }

      const newImages = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
        file: file,
      }));

      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleImageRemove = (index) => {
    const filteredImages = images.filter((image, i) => i !== index);
    setImages(filteredImages);
  };

  return {
    images,
    handleFileSelect,
    handleImageRemove,
  };
}

export default useImageUpload;
