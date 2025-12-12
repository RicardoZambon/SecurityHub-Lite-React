import { faHome, faLayerGroup, faTags } from '@fortawesome/free-solid-svg-icons';
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import ApplicationsPage from "./pages/ApplicationsPage";
import RolesPage from "./pages/RolesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ApplicationsPage />,
        handle: { breadcrumb: "Home", icon: faHome },
      },
      {
        path: "applications",
        element: <ApplicationsPage />,
        handle: { breadcrumb: "Applications", icon: faLayerGroup },
      },
      {
        path: "roles",
        element: <RolesPage />,
        handle: { breadcrumb: "Roles", icon: faTags },
      },
    ],
  },
])
