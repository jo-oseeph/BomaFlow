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
import PropertyDetailsPage from './pages/properties/PropertyDetailsPage'
import EditPropertyPage from './pages/properties/EditPropertyPage'

import UnitsDashboardPage from './pages/units/UnitsDashboardPage'
import AddUnitPage from './pages/units/AddUnitPage'
import UnitDetailsPage from './pages/units/UnitDetailsPage'
import EditUnitPage from './pages/units/EditUnitPage'


function App() {

  return (

    <Routes>


      {/* Supabase Auth Callback */}

      <Route
        path="/auth/callback"
        element={<AuthCallback />}
      />



      {/* Protected Dashboard Routes */}

      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>


          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />



          {/* Properties Module */}


          <Route
            path="/dashboard/properties"
            element={<PropertiesDashboardPage />}
          />


          <Route
            path="/dashboard/properties/new"
            element={<AddPropertyPage />}
          />


          <Route
            path="/dashboard/properties/:propertyId"
            element={<PropertyDetailsPage />}
          />


          <Route
            path="/dashboard/properties/:propertyId/edit"
            element={<EditPropertyPage />}
          />



          {/* Units Module */}


          <Route
            path="/dashboard/properties/:propertyId/units"
            element={<UnitsDashboardPage />}
          />


          <Route
            path="/dashboard/properties/:propertyId/units/new"
            element={<AddUnitPage />}
          />


          <Route
            path="/dashboard/units/:unitId"
            element={<UnitDetailsPage />}
          />


          <Route
            path="/dashboard/units/:unitId/edit"
            element={<EditUnitPage />}
          />


        </Route>

      </Route>





      {/* Authentication Pages */}


      <Route element={<AuthLayout />}>


        <Route
          path="/login"
          element={<LoginPage />}
        />


        <Route
          path="/signup"
          element={<SignupPage />}
        />


      </Route>





      {/* Public Website Routes */}


      <Route element={<Layout />}>


        <Route
          path="/"
          element={<HomePage />}
        />


        <Route
          path="/about"
          element={<AboutPage />}
        />


        <Route
          path="/properties"
          element={<PropertiesPage />}
        />


        <Route
          path="/services"
          element={<ServicesPage />}
        />


        <Route
          path="/contact"
          element={<ContactPage />}
        />


      </Route>


    </Routes>

  )

}


export default App