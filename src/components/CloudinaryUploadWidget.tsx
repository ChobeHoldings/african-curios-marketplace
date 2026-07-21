import React, { useEffect } from 'react';

interface CloudinaryUploadWidgetProps {
  onUpload: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function CloudinaryUploadWidget({ onUpload, onError }: CloudinaryUploadWidgetProps) {
  useEffect(() => {
    // Load Cloudinary widget script
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const openUploadWidget = () => {
    if (!window.cloudinary) {
      onError?.('Cloudinary widget not loaded');
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: 'yviwkn4q',
        uploadPreset: 'Test-curio',
        cropping: true,
        croppingAspectRatio: 1,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        defaultSource: 'local',
        resourceType: 'image',
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxFileSize: 5242880, // 5MB
      },
      (error: any, result: any) => {
        if (error) {
          onError?.(error.message || 'Upload failed');
        } else if (result && result.event === 'success') {
          const imageUrl = result.info.secure_url;
          onUpload(imageUrl);
        }
      }
    );
  };

  return (
    <button
      type="button"
      onClick={openUploadWidget}
      className="w-full px-4 py-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors hover:opacity-80 font-medium"
      style={{ borderColor: '#C18F4C', color: '#683837' }}
    >
      📸 Click to Upload Image
    </button>
  );
}
