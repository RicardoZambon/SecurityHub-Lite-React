import { faLayerGroup, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import ApplicationsPage from "./pages/Applications/ApplicationsListPage";
import HomePage from './pages/HomePage';
import RolesPage from "./pages/Roles/RolesListPage";
import UsersPage from './pages/Users/UsersListPage';

export const ROUTES = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: { breadcrumb: "Home" },
      },
      {
        path: "applications",
        element: <ApplicationsPage />,
        handle: { title: "Applications", icon: faLayerGroup },
      },
      {
        path: "roles",
        element: <RolesPage />,
        handle: { title: "Roles", icon: faTags },
      },
      {
        path: "users",
        element: <UsersPage />,
        handle: { title: "Users", icon: faUser },
      },
    ],
  },
];

export const router = createBrowserRouter(ROUTES);
