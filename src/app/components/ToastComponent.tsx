'use client';

import Image from 'next/image';
import React, {useContext} from 'react';
import {ToastContext} from '@/utils/toastContext';

export const ToastComponent = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('ToastComponent must be used within a ToastProvider');
  }
  const {toastList, dispatch} = context;

  const handleDeleteToast = (id: number) => {
    dispatch({type: 'REMOVE_TOAST', id});
  };

  if (toastList.length === 0) {
    return null;
  }

  return (
    <>
      <div className="notification-container fixed box-border text-sm z-50 bottom-3 right-3">
        {toastList.map((toast) => (
          <div
            key={toast.id}
            className={`notification toast flex items-center ${toast.bgColor} transition duration-300 ease-in-out relative pointer-events-auto overflow-hidden mb-4 px-7 py-9 max-h-24 h-12 rounded-md shadow-md text-white opacity-90 hover:shadow-lg hover:opacity-100 cursor-pointer`}
          >
            <button
              onClick={() => handleDeleteToast(toast.id)}
              className="absolute top-1 right-1 float-right font-bold outline-none border-none text-shadow-opacity-80 text-base leading-none p-0 m-0 bg-transparent"
            >
              X
            </button>
            <div className="notification-image float-left w-8 h-8 mr-4">
              <Image
                src={toast.icon}
                alt=""
                className="w-8 h-8"
              />
            </div>
            <div>
              <p className="notification-title text-base font-bold text-left mb-1 w-72 h-4">
                {toast.title}
              </p>
              <p className="notification-message -ml-0.5 h-4 text-sm text-left truncate">
                {toast.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
