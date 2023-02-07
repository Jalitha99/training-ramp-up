import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { cyan } from '@mui/material/colors'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { SignInState, UserSignUp } from '../../interfaces/interfaces'
import { signUpUserAPI } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser, signUpToSignIn } from '../SignIn/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}



const theme = createTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
  },
})

export default function SignUp() {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const signedUp = useSelector((state: SignInState) => state.user.signedUp);
  useEffect(() => {
    console.log('signedUp boolean :', signedUp)
    if(signedUp) {
      dispatch(signUpToSignIn())
      navigate('/')
    }
  }, [signedUp])

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const user: UserSignUp = {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }
      dispatch(signUpUser(user))
    },
  })
  // const token = useSelector((state: SignInState) => state.user.accessToken)
  // console.log('token in sign up page ', token)
  

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'cyan', width: 100, height: 100 }}></Avatar>
          <Typography component='h1' variant='h3'>
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
