import React from 'react'
import { useDispatch, useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { AppProps } from 'next/app'

import { ThemeProvider, DefaultTheme } from 'styled-components'

import usePeristedState from '../hooks/usePersistedState'

import light from '../styles/themes/light'
import dark from '../styles/themes/dark'
import GlobalStyle from '../styles/global'
import { Container } from '../styles/pages/Home'

import { Header } from '../components'

import { wrapper } from '../store'
import { initRequest } from '../store/modules/pokedex/actions'
import { saveRequest } from '../store/modules/pokemon/actions'

const Pokedex: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore()
  const dispatch = useDispatch()
  const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', light)
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  React.useEffect(() => {
    store.getState().pokedex.data.length === 0 && dispatch(initRequest())
  }, [])

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <ThemeProvider theme={theme}>
        <Container>
          <Header toggleTheme={toggleTheme} />
          <Component toggleTheme={toggleTheme} {...pageProps} />
        </Container>
        <GlobalStyle />
      </ThemeProvider>
    </PersistGate>
  )
}

export default wrapper.withRedux(Pokedex)
