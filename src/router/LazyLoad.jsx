import { lazy } from "react";

export const LandingPage = lazy(() => import("../pages/home/LandingPage"));
export const DashboardLayout = lazy(
  () => import("../pages/dashboard/layout/DashboardLayout"),
);
export const ErrorPage = lazy(() => import("../pages/others/ErrorPage"));
