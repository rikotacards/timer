import React from 'react';
import { ModalContext } from './ModalProvider';
import { DrawerContext } from './DrawerProvider';
import { SnackbarContext } from './SnackbarProvider';
import { StopwatchContext } from './StopwatchProvider';
import { AppDataContext } from './AppDataProvider';
export const useModalContext = () => React.useContext(ModalContext)
export const useDrawerContext = () => React.useContext(DrawerContext)
export const useSnackbarContext = () => React.useContext(SnackbarContext)

export const useStopwatchContext = () => React.useContext(StopwatchContext)
export const useAppDataContext = () => React.useContext(AppDataContext)