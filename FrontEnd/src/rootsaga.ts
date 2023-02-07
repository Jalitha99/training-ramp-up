import { all } from 'redux-saga/effects';
import homeSaga from './pages/Home/homeSaga';
import authSaga from './pages/SignIn/authSaga';

export default function* rootSaga() {
    yield all([homeSaga(), authSaga()]);
}
 