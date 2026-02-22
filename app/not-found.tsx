import { Metadata } from "next";
import NotFoundClient from "../components/notfound/NotFoundClient";

export const metadata: Metadata = {
  title: "404 - Page not found | John Doe",
  description:
    "The requested page could not be found. Please check the URL or return to the home page.",
};

const NotFoundPage = () => {
  return <NotFoundClient />;
};

export default NotFoundPage;
