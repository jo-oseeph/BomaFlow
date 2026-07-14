import AuthCallback from './pages/AuthCallback'
import { Routes, Route } from 'react-router-dom'
import AuthCallback from './pages/AuthCallback'
import Layout from './components/layout/Layout'
import AuthLayout from './components/layout/AuthLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PropertiesPage from './pages/PropertiesPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
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
