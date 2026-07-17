import { Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import AuthLayout from './components/layout/AuthLayout'
import DashboardLayout from './components/layout/DashboardLayout'

import ProtectedRoute from './components/auth/ProtectedRoute'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PropertiesPage from './pages/PropertiesPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AuthCallback from './pages/AuthCallback'

import DashboardPage from './pages/dashboard/DashboardPage'
import PropertiesDashboardPage from './pages/properties/PropertiesDashboardPage'
import AddPropertyPage from './pages/properties/AddPropertyPage'

function App() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/dashboard/properties"
            element={<PropertiesDashboardPage />}
          />

          <Route
            path="/dashboard/properties/new"
            element={<AddPropertyPage />}
          />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App