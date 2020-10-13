import { createStore, applyMiddleware, Store } from 'redux'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'
import createSagaMiddleware, { Task } from 'redux-saga'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

export interface SagaStore extends Store {
  sagaTask?: Task
}

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const makeConfiguredStore = (reducer, middlewares) =>
  createStore(reducer, undefined, bindMiddleware(middlewares))

const makeStore: MakeStore = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk, logger]

  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore(rootReducer, middlewares)
  } else {
    const { persistStore, persistReducer } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['favorite', 'pokedex'],
      storage
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = makeConfiguredStore(persistedReducer, middlewares)

    ;(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)

    store.__persistor = persistStore(store)

    return store
  }
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true })
