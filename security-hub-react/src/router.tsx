import { faLayerGroup, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import ApplicationsDetailsPage from './pages/Applications/ApplicationsDetailsPage';
import ApplicationsListPage from './pages/Applications/ApplicationsListPage';
import ApplicationsNewPage from './pages/Applications/ApplicationsNewPage';
import HomePage from './pages/HomePage';
import RolesDetailsPage from './pages/Roles/RolesDetailsPage';
import RolesPage from "./pages/Roles/RolesListPage";
import RolesNewPage from './pages/Roles/RolesNewPage';
import UsersDetailsPage from './pages/Users/UsersDetailsPage';
import UsersPage from './pages/Users/UsersListPage';
import UsersNewPage from './pages/Users/UsersNewPage';

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
        handle: { title: "Applications", icon: faLayerGroup },
        children: [
          {
            path: "",
            element: <ApplicationsListPage />,
          },
          {
            path: "new",
            element: <ApplicationsNewPage />,
            handle: { title: "New application", icon: faLayerGroup },
          },
          {
            path: ":id",
            element: <ApplicationsDetailsPage />,
            handle: { title: "Edit application", icon: faLayerGroup },
          },
        ]
      },
      {
        path: "roles",
        handle: { title: "Roles", icon: faTags },
        children: [
          {
            path: "",
            element: <RolesPage />,
          },
          {
            path: "new",
            element: <RolesNewPage />,
            handle: { title: "New role", icon: faTags },
          },
          {
            path: ":id",
            element: <RolesDetailsPage />,
            handle: { title: "Edit role", icon: faTags },
          },
        ]
      },
      {
        path: "users",
        handle: { title: "Users", icon: faUser },
        children: [
          {
            path: "",
            element: <UsersPage />,
          },
          {
            path: "new",
            element: <UsersNewPage />,
            handle: { title: "New user", icon: faUser },
          },
          {
            path: ":id",
            element: <UsersDetailsPage />,
            handle: { title: "Edit user", icon: faUser },
          },
        ]
      },
    ],
  },
];

export const router = createBrowserRouter(ROUTES);
