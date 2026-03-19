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
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyResetCode from "../pages/auth/VerifyResetCode";
import DiscoverEvents from "../pages/home/DiscoverEvents";
import MyEvents from "../pages/dashboard/others/ManageEvents";
import EventDetails from "../pages/dashboard/others/EventDetailPage";
import EventFormContainer from "../pages/dashboard/others/CreateEvent";
import EventTicket from "../pages/home/EventTicket";
import EventPage from "../pages/home/EventPage";
import CheckIn from "../pages/dashboard/others/Checkin";
import TicketDownload from "../pages/home/TicketDownload";

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
      {
        path: "/discover",
        element: <DiscoverEvents />,
      },
      {
        path: "/event/:name",
        element: <EventPage />,
      },
      {
        path: "/event-ticket/:name",
        element: <EventTicket />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
      {
        path: "verify-otp",
        element: <VerifyResetCode />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
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
      { path: "create-event", element: <EventFormContainer /> },
      { path: "checkin-user/:id", element: <CheckIn /> },
    ],
  },
  {
    path: "/ticket-download",
    element: <TicketDownload />,
  },
]);
