import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Login from "../pages/auth/Login";
import ForgetPassword from "../pages/auth/ForgetPassword";
import {
  AuthLayout,
  DashboardLayout,
  ErrorPage,
  HomeLayout,
  LandingPage,
  NotFound,
} from "./LazyLoad";
import Overview from "../pages/dashboard/others/Overview";
import MyEvents from "../pages/dashboard/others/ManageEvents";
import EventDetails from "../pages/dashboard/others/EventDetailPage";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "overview", element: <Overview /> },
      { path: "event-management", element: <MyEvents /> },
      { path: "event-details/:id", element: <EventDetails /> },
    ],
  },
]);
