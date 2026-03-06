import { Metadata } from "next";
import NotFoundClient from "../components/notfound/NotFoundClient";

/** SEO metadata for 404 page; shown when user hits a non-existent route */
export const metadata: Metadata = {
  title: "404 - Page not found | John Doe's Portfolio",
  description:
    "The requested page could not be found. Please check the URL or return to the home page.",
};

/** Next.js uses this component automatically for 404 responses */
const NotFoundPage = () => {
  return <NotFoundClient />;
};

export default NotFoundPage;
