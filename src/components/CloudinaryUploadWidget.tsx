import React, { useEffect, useState } from 'react';

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    if (window.cloudinary) {
      setIsLoaded(true);
      return;
    }

    // Load Cloudinary widget script
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    script.onerror = () => {
      onError?.('Failed to load Cloudinary widget');
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove script on cleanup - keep it loaded for subsequent uploads
    };
  }, [onError]);

  const openUploadWidget = () => {
    if (!window.cloudinary) {
      onError?.('Cloudinary widget not loaded yet. Please try again.');
      return;
    }

    try {
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
    } catch (err: any) {
      onError?.(err.message || 'Failed to open upload widget');
    }
  };

  return (
    <button
      type="button"
      onClick={openUploadWidget}
      disabled={!isLoaded}
      className="w-full px-4 py-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors hover:opacity-80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ borderColor: '#C18F4C', color: '#683837' }}
    >
      📸 {isLoaded ? 'Click to Upload Image' : 'Loading upload widget...'}
    </button>
  );
}
