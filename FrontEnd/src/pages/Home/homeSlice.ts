import { User } from '../../interfaces/interfaces'
import { createSlice } from '@reduxjs/toolkit'


interface HomeState {
  users: User[]
  error: string
  isLoading: boolean
}

const initialState: HomeState = {
  users: [],
  error: '',
  isLoading: false,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getUserRecords: (state) => {
      state.isLoading = true
    },
    getUserRecordsSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    getUserRecordsFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    addUserRecord: (state, action) => {
      state.isLoading = true
    },
    addUserRecordSuccess: (state, action) => {
      state.isLoading = false
      action.payload.dob = new Date(action.payload.dob)
      state.users = [...state.users, action.payload]
    },
    addUserRecordFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    deleteUserRecord: (state, action) => {
      state.isLoading = true
    },
    deleteUserRecordSuccess: (state, action) => {
      state.isLoading = false
      state.users = state.users.filter((student) => student.id !== action.payload)
    },
    deleteUserRecordFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    updateUserRecord: (state, action) => {
      state.isLoading = true
    },
    updateUserRecordSuccess: (state, action) => {
      state.isLoading = false
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          action.payload.dob = new Date(action.payload.dob)
          return {
            ...action.payload,
            inEdit: false,
          }
        }
        return user
      })
    },
    updateUserRecordFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {
  getUserRecords,
  getUserRecordsSuccess,
  getUserRecordsFailure,
  addUserRecord,
  addUserRecordSuccess,
  addUserRecordFailure,
  deleteUserRecord,
  deleteUserRecordSuccess,
  deleteUserRecordFailure,
  updateUserRecord,
  updateUserRecordSuccess,
  updateUserRecordFailure,
} = homeSlice.actions
