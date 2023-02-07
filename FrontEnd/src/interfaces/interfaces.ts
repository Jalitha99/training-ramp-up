export interface User {
  id: number
  name: string
  gender: string
  address: string
  mobile: string
  dob: string | Date
  age: number
  inEdit?: boolean | string
}

export interface HomeState {
  home: {
    users: User[]
    error: string
    isLoading: boolean
  }
}

export interface UserSignIn {
  email: string
  password: string
}

export interface UserSignUp {
  email: string
  password: string
  confirmPassword: string
}

export interface SignInState{
  user:{
    isSignInLoading: boolean;
    isSignUpLoading: boolean;
    isSignOutLoading: boolean;
    accessToken: string | null;
    signedIn: boolean;
    signedUp: boolean;
    error: string;
    role: string | null;
  }
}