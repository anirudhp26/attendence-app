import { useGoogleLogin } from '@react-oauth/google';
import Axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/auth';

export default function Auth() {
  const [isFormLogin, setIsFormLogin] = useState(true);
  const dispatch = useDispatch();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await Axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      console.log(userInfo);
      dispatch(setLogin({
        user: userInfo.data,
        token: userInfo.data.sub
      }))
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div className='auth-root'>
      <div className='login' style={{ display: isFormLogin ? "flex" : "none" }}>
        <p className='auth-heading'>
          Login
        </p>
        <button className='auth-btn' onClick={() => {
          googleLogin();
        }}>Login with google</button>
        <button className='auth-btn' onClick={() => {
          setIsFormLogin(false);
        }}>Don't have an account ?</button>
      </div>
      <div className='register' style={{ display: isFormLogin ? "none" : "flex" }}>
        <p className='auth-heading'>
          Register
        </p>
        <button className='auth-btn' onClick={() => {
          setIsFormLogin(true);
        }}>Already have an account ?</button>
      </div>
    </div>
  )
}
