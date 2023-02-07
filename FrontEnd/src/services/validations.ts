import { toast } from 'react-toastify'
import { UserSignIn, UserSignUp } from '../interfaces/interfaces'

const isEmailValid = (email: string) => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!email || !reg.test(email)) {
    return false
  }
  return true
}

const isPasswordValid = (password: string) => {
  const reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  if (!password || !reg.test(password)) {
    return false
  }
  return true
}
const isPasswordMatches = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return false
  }
  return true
}

export const validateSignIn = (email: string, password: string) => {
  if (!isEmailValid(email)) {
    toast.error('Please input a valid Email Address!')
    return false
  }
  if (!isPasswordValid(password)) {
    toast.error(
      'Please input a valid Password! Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
    )
    return false
  }
  return true
}

export const validateSignUp = (email: string, password: string, confirmPassword: string) => {
  if (!isEmailValid(email)) {
    toast.error('Please input a valid Email Address!')
    return false
  }
  if (!isPasswordValid(password)) {
    toast.error(
      'Please input a valid Password! Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
    )
    return false
  }
  if (!isPasswordMatches(password, confirmPassword)) {
    toast.error('Password does not match!')
    return false
  }
  return true
}
