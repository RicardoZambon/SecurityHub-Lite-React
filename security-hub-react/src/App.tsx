import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import ApplicationsPage from './pages/ApplicationsPage'
import RolesPage from './pages/RolesPage'
import { Layout } from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/applications" replace />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/roles" element={<RolesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;