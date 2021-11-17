import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/DashboardLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView'
import NotFoundView from './views/errors/NotFoundView';
import ManagementView from './views/management';
import MapView from "./views/map";
import AddDevice from "./views/management/AddDeviceView";
import DashboardView from "./views/reports/DashboardView";
import AccountView from "./views/account";
import EditAccount from "./views/account/EditAccountView"
import RemoteControl from "./views/remoteControl";
import ReportView from "./views/reportData";
import UserManageView from "./views/management/UserManageView";

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'map', element: <MapView /> },
      { path: 'management', element: <ManagementView /> },
      { path: 'add_device', element: <AddDevice /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'account', element: < AccountView /> },
      { path: 'edit_account', element: <EditAccount /> },
      { path: 'reportData', element: < ReportView /> },
      { path: 'remote-control', element: < RemoteControl /> },
      { path: 'userManage', element: <UserManageView /> },
      { path: '/', element: < RemoteControl /> },


      ,
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    // element: <MainLayout />,
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
