import { takeEvery, put, call } from 'redux-saga/effects'
import { UserSignUp, UserSignIn } from '../../interfaces/interfaces'
import { logout, signInUserAPI, signUpUserAPI } from '../../api/api'
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFailure,
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  signOutUser,
  signOutUserSuccess,
  signOutUserFailure,
} from './authSlice'
import { toast } from 'react-toastify'


interface signUpUserAction {
  type: string
  payload: UserSignUp
}

interface signInUserAction {
  type: string
  payload: UserSignIn
}


function* signUpUserSaga(action: signUpUserAction): Generator<any, any, any> {
  try {
    const response = yield call(() => signUpUserAPI(action.payload))
    console.log('responce :',response)
    if(response.status === 201){
      yield put(signUpUserSuccess(response))
      toast.success('User Signed Up successfully!')
    } else if(response.status === 200){
      yield put(signUpUserFailure(response))
      toast.error('Email already exists!')
    }else{
      yield put(signUpUserFailure(response))
      toast.error('Something went wrong!')
    }
  } catch (error) {
    yield put(signUpUserFailure(error))
  }
}

function* signInUserSaga(action: signInUserAction): Generator<any, any, any> {
  try {
    const response = yield call(() => signInUserAPI(action.payload))
    if(response.status === 200){
      yield put(signInUserSuccess(response))
      sessionStorage.setItem('accessToken', response.data.accessToken)
      toast.success('User Signed In successfully!')
    // } else if(response.status === 401){
    //   yield put(signInUserFailure(response))
    //   toast.error('Invalid Credentials!')
    }else{
      yield put(signInUserFailure(response))
      toast.error(response.response.data)
    }
  } catch (error) {
    yield put(signInUserFailure(error))
  }
}

function* signOutUserSaga(): Generator<any, any, any>{
  try{
    const response = yield call(() => logout())
    sessionStorage.removeItem('accessToken')
    yield put(signOutUserSuccess())
  } catch (error) {
    yield put(signOutUserFailure(error))
  }
}

export default function* authSaga() {
  yield takeEvery(signUpUser, signUpUserSaga)
  yield takeEvery(signInUser, signInUserSaga)
  yield takeEvery(signOutUser, signOutUserSaga)
}
