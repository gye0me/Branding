import React from "react";

const ImageModal = ({ showImageModal, selectedImage, onClose }) => {
  if (!showImageModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 overflow-auto p-4"
      onClick={onClose}
    >
      <div className="relative my-auto">
        <img
          src={selectedImage}
          alt="확대된 이미지"
          className="max-w-full max-h-[90vh] rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
