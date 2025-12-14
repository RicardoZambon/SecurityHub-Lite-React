import { faLayerGroup, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import ApplicationsListPage from './pages/Applications/ApplicationsListPage';
import ApplicationsDetailsPage from './pages/Applications/ApplictionsDetailsPage';
import ApplicationsNewPage from './pages/Applications/ApplictionsNewPage';
import HomePage from './pages/HomePage';
import RolesDetailsPage from './pages/Roles/RolesDetailsPage';
import RolesPage from "./pages/Roles/RolesListPage";
import RolesNewPage from './pages/Roles/RolesNewPage';
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
            handle: { title: "New application", icon: faLayerGroup },
          },
          {
            path: ":id",
            element: <RolesDetailsPage />,
            handle: { title: "Edit application", icon: faLayerGroup },
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
        ]
      },
    ],
  },
];

export const router = createBrowserRouter(ROUTES);
