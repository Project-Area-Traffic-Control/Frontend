import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
    
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
     { path: 'login', element: <LoginView /> },
     { path: '/', element: <Navigate to="/login" /> },
     { path: 'register', element: <RegisterView /> },
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
