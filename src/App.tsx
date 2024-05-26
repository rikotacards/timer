
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'
import { Layout } from './layout/Layout';
import { ModalProvider } from './Providers/ModalProvider';
import { DrawerProvider } from './Providers/DrawerProvider';
import { SnackbarProvider } from './Providers/SnackbarProvider';
import { StopwatchProvider } from './Providers/StopwatchProvider';
import { AppDataProvider } from './Providers/AppDataProvider';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { StatsByCategory } from './components/StatsByCategory';
import { TopAppBarProvider } from './Providers/TopAppBarProvider';
import { NewEntryFormNarrow } from './components/NewEntryFormNarrow';
import { SettingsPage } from './pages/SettingsPage';
import { TodaySummary } from './components/TodaySummary';
import { History } from './components/History';

const router = createBrowserRouter([
  {
    path:'/',
    element: <TopAppBarProvider><Layout/></TopAppBarProvider>,
    children: [
      {
        path: '',
        element: <TodaySummary/>

      },
      {
        path: 'stats/:categoryName',
        element: <StatsByCategory/>
      },
      {
        path: 'stats',
        element: <StatsByCategory/>
      }, 
      {
        path: 'add-entry',
        element: <NewEntryFormNarrow/>
      },
      {
        path: 'app-settings',
        element: <SettingsPage/>
      },
      {
        path: 'history',
        element: <History/>
      }
    ]
  }
])
export const IS_OFFLINE = false
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000',
      paper: '#000'
    }
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
                  <RouterProvider router={router}/>
                </ModalProvider>
              </DrawerProvider>
            </SnackbarProvider>
          </StopwatchProvider>
        </AppDataProvider>

    </ThemeProvider>


  )
}

export default App
