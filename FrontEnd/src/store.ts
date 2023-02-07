import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import homeSaga from './pages/Home/homeSaga';
import authSaga from './pages/SignIn/authSaga';
import rootSaga from '../src/rootsaga';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;