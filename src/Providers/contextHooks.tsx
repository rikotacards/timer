import React from 'react';
import { ModalContext } from './ModalProvider';
import { DrawerContext } from './DrawerProvider';
import { SnackbarContext } from './SnackbarProvider';
export const useModalContext = () => React.useContext(ModalContext)
export const useDrawerContext = () => React.useContext(DrawerContext)
export const useSnackbarContext = () => React.useContext(SnackbarContext)

