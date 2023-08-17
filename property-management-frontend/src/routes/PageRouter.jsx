import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import SignUp from "../components/Auth/SignUp/SignUp";
import PropertyDetail from "../components/Properties/PropertyDetail";
import Home from "../pages/Home";
import AddProperty from "../components/AddProperty/AddProperty";
import RequireAuth from "../components/Auth/RequireAuth";
import Application from "../components/Customer/Application/Application";
import Favorite from "../components/Customer/Favorite/Favorite";
import MyProperties from "../components/Owner/MyProperties/MyProperties";
import MyPropertyOffers from "../components/Owner/MyPropertyOffers/MyPropertyOffers";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import ListUsers from "../components/Users/Users";
import OwnerDashboard from "../components/Owner/OwnerDashboard/OwnerDashboard";
import Footer from "../components/Footer/Footer";
import ForgotPassword from "../components/Auth/PasswordReset/ForgotPassword";
import ResetPassword from "../components/Auth/PasswordReset/ResetPassword";
import NotFound from "../components/NotFound/NotFound";
export default function PageRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
            <Footer />
          </>
        }
      ></Route>
      <Route
        path="property/:id"
        element={
          <>
            <PropertyDetail />
            <Footer />
          </>
        }
      ></Route>
      <Route path="login" element={<LoginForm />}></Route>
      <Route path="sign-up" element={<SignUp />}></Route>
      <Route
        path="my-applications"
        element={
          <RequireAuth>
            <Application />{" "}
          </RequireAuth>
        }
      ></Route>
      <Route
        path="my-favorites"
        element={
          <RequireAuth>
            <Favorite />{" "}
          </RequireAuth>
        }
      ></Route>
      <Route
        path="my-properties"
        element={
          <RequireAuth>
            <MyProperties />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="my-applications"
        element={
          <RequireAuth>
            <Application />{" "}
          </RequireAuth>
        }
      ></Route>
      <Route
        path="add-property"
        element={
          <RequireAuth>
            <AddProperty />
          </RequireAuth>
        }
      />
      <Route
        path="properties-offers"
        element={
          <RequireAuth>
            <MyPropertyOffers />
          </RequireAuth>
        }
      />
      <Route
        path="/update-property/:propertyId"
        element={
          <RequireAuth>
            <AddProperty />
          </RequireAuth>
        }
      />
      <Route
        path="admin/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="users"
        element={
          <RequireAuth>
            <ListUsers />
          </RequireAuth>
        }
      />
      <Route
        path="my-applications"
        element={
          <RequireAuth>
            <Application />{" "}
          </RequireAuth>
        }
      ></Route>
      <Route
        path="my-favorites"
        element={
          <RequireAuth>
            <Favorite />{" "}
          </RequireAuth>
        }
      ></Route>
      <Route
        path="my-properties"
        element={
          <RequireAuth>
            <MyProperties />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="my-applications"
        element={
          <RequireAuth>
            <Application />{" "}
          </RequireAuth>
        }
      ></Route>
      <Route
        path="add-property"
        element={
          <RequireAuth>
            <AddProperty />
          </RequireAuth>
        }
      />
      <Route
        path="properties-offers"
        element={
          <RequireAuth>
            <MyPropertyOffers />
          </RequireAuth>
        }
      />
      <Route
        path="/update-property/:propertyId"
        element={
          <RequireAuth>
            <AddProperty />
          </RequireAuth>
        }
      />
      <Route
        path="/owner/dashboard"
        element={
          <RequireAuth>
            <OwnerDashboard />
          </RequireAuth>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
