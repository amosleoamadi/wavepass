import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../components";
import { DashboardLayout, ErrorPage, LandingPage } from "./LazyLoad";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ index: true, element: <LandingPage /> }],
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
  },
]);
