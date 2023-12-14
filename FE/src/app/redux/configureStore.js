import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'

import reducers from './combineReducers'
import { rootSaga } from './sagas/rootSaga'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, reducers)

export default function () {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({ serializableCheck: false }), sagaMiddleware],
  })

  let persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
