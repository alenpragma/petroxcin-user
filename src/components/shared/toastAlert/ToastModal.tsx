"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  handleClose: () => void;
}

const SuccessModal = ({ handleClose }: ModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [handleClose]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg relative">
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-600 mb-3">
            Transfer Successful
          </h2>
          <p>The transaction has been completed successfully.</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;
