import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

// --- STATIC METADATA ---
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Portfolio Content Management.",
};

const DashboardPage = () => {
  return <DashboardClient />;
};

export default DashboardPage;
