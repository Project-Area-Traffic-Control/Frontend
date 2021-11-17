import React from 'react';
import {Route, Navigate} from 'react-router';


interface Props{
  element:any;
  path:string;
  children?:any;
}

export default function ProtectedRoute({element, path, children}:Props){
  const isLoggedIn = LOGICTOCHECKIFUSERISLOGGEDINORNOT;

  return isLoggedIn?(<Route path={path} element={element}>{children}</Route>): (<Navigate to={"/auth/login"} replace={true}/> )
}