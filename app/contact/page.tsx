import {Metadata} from 'next';
import ContactClient from "@/components/contact/ContactClient";
import {Metacontact} from "@/lib/metaData";

// Page-level SEO; overrides root layout metadata for this route
export const metadata: Metadata = Metacontact

/** Contact route: renders ContactClient (form + info). Form submits to Formspree. */
const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
