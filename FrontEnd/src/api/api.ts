import axios from 'axios'
import { User, UserSignIn, UserSignUp } from '../interfaces/interfaces'
import store from '../../src/store'
import { signOutUser } from '../pages/SignIn/authSlice'
import { toast } from 'react-toastify'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
// import { Navigate } from 'react-router-dom'

// const logout = (navigate : any) => {
//   localStorage.removeItem('accessToken');
//   navigate('/');
// };

export const client = axios.create({
  baseURL: 'http://localhost:3001/',
})

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  },
  withCredentials: true,
})

// export const privateAxios = axios.create({
//   baseURL: 'http://localhost:3001/',
//   headers: {  'content-type': 'application/json'},
//   withCredentials: true,
// })

// const axiosPrivatehook = useAxiosPrivate()

axiosPrivate.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const { data } = await axiosPrivate.get('/refresh', {
          withCredentials: true,
        })
        console.log('data', data)
        sessionStorage.setItem('accessToken', data)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data
        originalRequest.headers['Authorization'] = 'Bearer ' + data
        return await axiosPrivate(originalRequest)
      } catch (err: any) {
        if (err.response.status === 401) {
          console.log('navigate')
          store.dispatch(signOutUser())
          toast.info('Session expired, please login again')
        }
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  },
)

export const getUsers = () => {
  return axiosPrivate.get('home/')
}

export async function addUserr(user: User) {
  try {
    const response = await axiosPrivate.post('home/', user)
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export async function updateUser(user: any) {
  try {
    const response = await axiosPrivate.put(`home/${user.id}`, user)
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export const deleteUser = (id: any) => {
  axiosPrivate
    .delete(`home/${id}`)
    .then((response) => {
      console.log('response', response.data)
    })
    .catch((error) => {
      console.error('error', error)
    })
}

export async function signUpUserAPI(user: UserSignUp) {
  try {
    const response = await client.post('signup/', user)
    console.log('response', response)
    return response
  } catch (error) {
    console.error('error', error)
  }
}

export async function signInUserAPI(user: UserSignIn) {
  try {
    const response = await client.post('/', user, {
      withCredentials: true,
    })
    console.log('response', response)

    return response
  } catch (error) {
    console.error('error', error)
    return error
  }
}

export async function logout() {
  try {
    const response = await client.get('/logout', {
      withCredentials: true,
    })
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
