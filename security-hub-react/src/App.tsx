import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import ApplicationsPage from './pages/ApplicationsPage'
import RolesPage from './pages/RolesPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>Security Hub Lite</h1>
          <p>Applications, Roles & Users Dashboard</p>

          <nav className="app-nav">
            <NavLink
              to="/applications"
              className={({ isActive }: { isActive: boolean }) =>
                'app-nav-link' + (isActive ? ' app-nav-link-active' : '')
              }
            >
              Applications
            </NavLink>

            <NavLink
              to="/roles"
              className={({ isActive }: { isActive: boolean }) =>
                'app-nav-link' + (isActive ? ' app-nav-link-active' : '')
              }
            >
              Roles
            </NavLink>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/applications" replace />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/roles" element={<RolesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;