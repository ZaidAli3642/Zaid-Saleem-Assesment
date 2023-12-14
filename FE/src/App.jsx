import { ThemeProvider } from '@mui/material'
import './App.css'
import theme from './app/config/theme'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Root from './app/Root'
import configureStore from './app/redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore()

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Root />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  )
}

export default App
