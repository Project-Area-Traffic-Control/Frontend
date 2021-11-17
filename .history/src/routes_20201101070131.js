import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView'
import NotFoundView from './views/errors/NotFoundView';
import { history } from './_helpers';

const routes = [
  { 
    path: 'app',
    history:history,
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <NotFoundView />
    
    },
        // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
    {
    path: '/',
    history:history,
     element: <MainLayout />,
      children: [
      { path: 'login', element: <LoginView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '404', element: <NotFoundView /> },
      { path: 'register', element: <RegisterView /> },
       { path: '*', element: <Navigate to="/404" /> }
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
