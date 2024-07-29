
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
import { AddEntryNarrow } from './components/AddEntryNarrow';
import { SettingsPage } from './pages/SettingsPage';
import { TodaySummary } from './components/TodaySummary';
import { History } from './components/History';
import { DashboardPage } from './pages/DashboardPage';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <DrawerProvider>
        <TopAppBarProvider>

          <Layout />
        </TopAppBarProvider>
      </DrawerProvider>,
    children: [
      {
        path: '',
        element: <TodaySummary />

      },
      {
        path: 'stats/:categoryName',
        element: <StatsByCategory />
      },
      {
        path: 'stats',
        element: <StatsByCategory />
      },
      {
        path: 'add-entry',
        element: <AddEntryNarrow />
      },
      {
        path: 'app-settings',
        element: <SettingsPage />
      },
      {
        path: 'history',
        element: <History />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
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
  const queryClient = new QueryClient();

  return (

    <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>

      <CssBaseline />
      <AppDataProvider>
        <StopwatchProvider>
          <SnackbarProvider>
            <ModalProvider>
              <RouterProvider router={router} />
            </ModalProvider>
          </SnackbarProvider>
        </StopwatchProvider>
      </AppDataProvider>
      </QueryClientProvider>
    </ThemeProvider>


  )
}

export default App
