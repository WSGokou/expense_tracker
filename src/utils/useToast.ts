import {useContext} from 'react';
import checkIcon from '@/assets/check.svg';
import errorIcon from '@/assets/error.svg';
import infoIcon from '@/assets/info.svg';
import warningIcon from '@/assets/warning.svg';
import {StaticImageData} from 'next/image';
import {ToastContext} from './ToastContext';

interface Toast {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  icon: StaticImageData;
}

interface ToastOptions {
  autoDelete?: boolean;
  autoDeleteTime?: number;
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  const {toastList, dispatch} = context;

  const showToast = (
    type: 'success' | 'error' | 'info' | 'warning',
    message: string,
    options: ToastOptions = {},
  ) => {
    const toastProperties: Toast = {
      id: Math.floor(Math.random() * 1000) + 1,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: message,
      bgColor:
        type === 'success'
          ? 'bg-[#5cb85c]'
          : type === 'error'
          ? 'bg-[#d9534f]'
          : type === 'info'
          ? 'bg-[#5bc0de]'
          : type === 'warning'
          ? 'bg-[#f0ad4e]'
          : '',
      icon:
        type === 'success'
          ? checkIcon
          : type === 'error'
          ? errorIcon
          : type === 'info'
          ? infoIcon
          : type === 'warning'
          ? warningIcon
          : '',
    };

    dispatch({type: 'ADD_TOAST', toast: toastProperties});

    if (options.autoDelete) {
      setTimeout(() => {
        dispatch({type: 'REMOVE_TOAST', id: toastProperties.id});
      }, options.autoDeleteTime || 3000);
    }
  };

  const toast = {
    success: (message: string, options?: ToastOptions) =>
      showToast('success', message, options),
    error: (message: string, options?: ToastOptions) =>
      showToast('error', message, options),
    info: (message: string, options?: ToastOptions) =>
      showToast('info', message, options),
    warning: (message: string, options?: ToastOptions) =>
      showToast('warning', message, options),
  };

  return {toastList, toast};
};
