
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import { Layout } from './layout/Layout';
import { ModalProvider } from './Providers/ModalProvider';
import { DrawerProvider } from './Providers/DrawerProvider';
import { SnackbarProvider } from './Providers/SnackbarProvider';
import { StopwatchProvider } from './Providers/StopwatchProvider';
import { AppDataProvider } from './Providers/AppDataProvider';
export const IS_OFFLINE = false;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppDataProvider>

      <StopwatchProvider>

        <SnackbarProvider>
          <DrawerProvider>
            <ModalProvider>
              <Layout />
            </ModalProvider>
          </DrawerProvider>
        </SnackbarProvider>
      </StopwatchProvider>
      </AppDataProvider>
    </ThemeProvider>


  )
}

export default App
