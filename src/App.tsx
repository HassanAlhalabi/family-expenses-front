import {  Route, Routes } from "react-router-dom";
import NotFound from "./components/not-found";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import MaterialsPage from "./pages/materials";
import OutlayTypesPage from "./pages/outlay-types";
import OutlaysPage from "./pages/outlays";
import ReportsPage from "./pages/reports";
import UsersPage from "./pages/users";
import AuthorizedRoute from "./routes/authorized-route";
import ProtectedRoute from "./routes/protected-route";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={'/login'}      element={<Login />} /> 
        <Route path='/' index       element={<ProtectedRoute  element={<Dashboard />} />} />
        <Route path='/users'        element={<AuthorizedRoute element={<UsersPage />} />} />
        <Route path='/outlays'      element={<ProtectedRoute  element={<OutlaysPage />} />} />
        <Route path='/materials'    element={<AuthorizedRoute element={<MaterialsPage />} />} />
        <Route path='/outlay-types' element={<AuthorizedRoute element={<OutlayTypesPage />} />} />
        <Route path='/reports'      element={<AuthorizedRoute element={<ReportsPage />} />} />
        <Route path="*"             element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
