import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { SignInState } from '../interfaces/interfaces';
import  SignIn  from '../pages/SignIn/SignIn';

// type RouteGuardProps = {
//     element: JSX.Element;
//   };  

// export const RequireAuth = ({ element }: RouteGuardProps) : JSX.Element => {
//     // const isSignedIn = useSelector((state: SignInState) => state.auth.signedIn);
//     const isSignedIn = false;
//     return isSignedIn ? element : <SignIn />;

// }

const RequireAuth = ()  => {
    const isSignedIn = useSelector((state: SignInState) => state.user.signedIn);
    // const isSignedIn = true;
    return (
      isSignedIn ? <Outlet/> : <Navigate to="/" />
    )
}

export default RequireAuth;