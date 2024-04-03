
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import { Layout } from './layout/Layout';
import { ModalProvider } from './Providers/ModalProvider';
import { DrawerProvider } from './Providers/DrawerProvider';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {

  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <DrawerProvider>
        <ModalProvider>
          <Layout />
        </ModalProvider>
      </DrawerProvider>
    </ThemeProvider>


  )
}

export default App
