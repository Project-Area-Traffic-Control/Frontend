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
import ManualControl from "./views/manualControl";
import JunctionView from "./views/Junction";
import UserManageView from "./views/management/UserManageView";
import { junctionService } from './services/junction.service';
import EditJunction from './views/Junction/EditJunction';
import ControlView from './views/control';
import CreateJunction from './views/Junction/CreateJunction';
import Flashing from './views/flashing';
import Plan from './views/control/plan';
import ConfigMode from './views/control/mode';
import CreatePlan from './views/control/plan/CreatePlan';
import EditPlan from './views/control/plan/EditPlan';
// let junction = junctionService.getAllJunction()
// let junctionID = []
// for (let index = 0; index < junction.length; index++) {
//   junctionID.push(junction[index].id)
// }

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
      { path: 'junction', element: < JunctionView /> },
      { path: `junction/:junction_id`, element: < EditJunction /> },
      { path: 'junction/:junction_id/plans', element: < Plan /> },
      { path: 'junction/:junction_id/create_plan', element: < CreatePlan /> },
      { path: 'plan/:plan_id/edit_plan', element: < EditPlan /> },
      { path: 'junction/:junction_id/flashing_plan', element: < Flashing /> },
      { path: 'junction/:junction_id/config_mode', element: < ConfigMode /> },
      { path: 'manual_control/:junction_id', element: < ManualControl /> },
      { path: 'create_junction', element: < CreateJunction /> },
      { path: 'userManage', element: <UserManageView /> },
      { path: '/', element: <DashboardView /> },


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
