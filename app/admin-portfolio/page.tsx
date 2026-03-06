import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

// SEO for /admin-portfolio (demo dashboard; no real backend)
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Portfolio Content Management.",
};

/** Demo admin/dashboard route; renders DashboardClient (UI only, data from localStorage for demo). */
const DashboardPage = () => {
  return <DashboardClient />;
};

export default DashboardPage;
