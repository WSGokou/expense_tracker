import {StaticImageData} from 'next/image';
import React, {createContext, useReducer, ReactNode} from 'react';

interface Toast {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  icon: StaticImageData;
}

type ToastAction =
  | {type: 'ADD_TOAST'; toast: Toast}
  | {type: 'REMOVE_TOAST'; id: number};

type ToastDispatch = (action: ToastAction) => void;

export const ToastContext = createContext<
  {toastList: Toast[]; dispatch: ToastDispatch} | undefined
>(undefined);

const toastReducer = (state: Toast[], action: ToastAction) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.toast];
    case 'REMOVE_TOAST':
      return state.filter((toast) => toast.id !== action.id);
    default:
      return state;
  }
};

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [toastList, dispatch] = useReducer(toastReducer, []);

  return (
    <ToastContext.Provider value={{toastList, dispatch}}>
      {children}
    </ToastContext.Provider>
  );
};
