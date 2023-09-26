import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const GroupList = lazy(() => import('../pages/Groups/List'));
const Order = lazy(() => import('../pages/Admin/Order'));
const Sender = lazy(() => import('../pages/Admin/Sender'));
const Simple = lazy(() => import('../pages/Messages/Simple'));
const Masse = lazy(() => import('../pages/Messages/SmsMasse'));
const Transaction = lazy(() => import('../pages/Reports/Transaction'));
const ECommerce = lazy(() => import('../pages/Dashboard/ECommerce'));

const coreRoutes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: ECommerce,
  },
  {
    path: '/calendar',
    title: '/Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/groups/list',
    title: 'Contacts et Groups',
    component: GroupList,
  },
  {
    path: '/admin/orders',
    title: 'Commander',
    component: Order,
  },
  {
    path: '/admin/senders',
    title: 'Sender',
    component: Sender,
  },
  {
    path: '/messages/simple',
    title: 'Simple',
    component: Simple,
  },
  {
    path: '/messages/sms-masse',
    title: 'Masse',
    component: Masse,
  },
  {
    path: 'reports/transactions',
    title: 'Transactions',
    component: Transaction,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
