import { faLayerGroup, faTags } from '@fortawesome/free-solid-svg-icons';
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import ApplicationsPage from "./pages/Applications/ApplicationsListPage";
import RolesPage from "./pages/Roles/RolesListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ApplicationsPage />,
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
    ],
  },
])
