import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';

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
     
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
