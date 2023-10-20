import { ThemeProvider } from '@emotion/react'
import Header from './Header'
import { Container, CssBaseline, createTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponent from './LoadingComponent'
import { fetchBasketAsync } from '../../features/basket/BasketSlice'
import { useAppDispatch } from '../store/configureStore'
import { fetchCurrentUser } from '../../features/account/accountSlice'
import { useCallback } from "react"

function App() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser())
      await dispatch(fetchBasketAsync())
    } catch (error) {
      console.log(error)
    }
  }, [dispatch]) 

  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212',
      },
    },
  })

  const handleThemeChange = () => {
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message='Initialising app...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
