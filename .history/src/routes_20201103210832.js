import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView'
import NotFoundView from './views/errors/NotFoundView';
import DeviceView from './views/devices'
import MapView from "./views/map"
import AddDevice from "./views/devices/AddDeviceView"
import DashboardView from "./views/reports/DashboardView"
import AccountView from "./views/account"
const routes = [
  { 
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path:'map', element: <MapView />},
      { path:'device', element: <DeviceView />},
      { path:'add_device', element:<AddDevice />},
      { path:'dashboard', element: <DashboardView />},
      { path: 'account' , element: < AccountView /> },

    ,
        // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
    {
    path: '/',
      element: <MainLayout />,
      children: [
  
     
      { path: 'login' , element: <LoginView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '404', element: <NotFoundView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '*', element: <Navigate to="/404" /> }
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
