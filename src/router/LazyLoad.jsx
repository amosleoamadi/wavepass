import { lazy } from "react";

export const LandingPage = lazy(() => import("../pages/home/LandingPage"));
export const DashboardLayout = lazy(
  () => import("../pages/dashboard/layout/DashboardLayout"),
);
export const ErrorPage = lazy(() => import("../pages/others/ErrorPage"));
export const AuthLayout = lazy(
  () => import("../components/layouts/AuthLayout"),
);
export const HomeLayout = lazy(
  () => import("../components/layouts/HomeLayout"),
);
export const NotFound = lazy(() => import("../pages/others/NotFound"));
