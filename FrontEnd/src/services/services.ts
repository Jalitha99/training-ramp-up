import { toast } from 'react-toastify'
import { User } from '../interfaces/interfaces'
import 'react-toastify/dist/ReactToastify.css'
import * as io from 'socket.io-client'

// eslint-disable-next-line prefer-const
let validations: string[] = []

export const socket = io.connect('http://localhost:3001')

const isEmpty = (item: User) => {
  if (!item.name || !item.address || !item.mobile || !item.dob) {
    validations.push('Please input all fields!')
    return true
  }
  return false
}

const isUsernameInvalid = (item: string) => {
  const reg = new RegExp('^[a-z A-Z]+$')
  if (!item || !reg.test(item)) {
    console.log('line 23 ', reg.test(item))
    validations.push('Please provide a valid Name')
    return true
  }
  return false
}

const isMobileInvalid = (item: string) => {
  const reg = new RegExp('^[0-9+ ]+$')
  if (!item || !reg.test(item) || item.length < 10) {
    validations.push('Please provide a valid Mobile No.')
    return true
  }
  return false
}

const isOver18 = (item: User) => {
  const age = calculateAge(item)
  if (age < 18) {
    validations.push('User should be 18+')
    return true
  }
  return false
}

export const validationFunc = (arr: User) => {
  console.log('is empty function :', isEmpty(arr))
  if (isEmpty(arr)) {
    toast.error('Please input all fields!')
    return false
  }
  if (isUsernameInvalid(arr.name)) {
    toast.error('Please provide a valid Name')
    return false
  }
  if (isMobileInvalid(arr.mobile)) {
    toast.error('Please provide a valid Mobile No.')
    return false
  }
  if (isOver18(arr)) {
    toast.error('User should be 18+')
    return false
  }
  return true
}

const calculateAge = (user: User) => {
  // eslint-disable-next-line no-var
  const today = new Date()
  // eslint-disable-next-line no-var
  const birthDate = new Date(user.dob)
  let ageNow = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    ageNow--
  }
  return ageNow
}

export const modifyAdd = (item: User) => {
  item.inEdit = false
  item.age = calculateAge(item)
  if (!item.gender) {
    // add gender as male if new user is not a female
    item.gender = 'male'
  }
  return item
}

export const modifyUpdate = (item: User) => {
  item.age = calculateAge(item)
  item.inEdit = false
  toast.success('User Updated Successfully!')
  return item
}
