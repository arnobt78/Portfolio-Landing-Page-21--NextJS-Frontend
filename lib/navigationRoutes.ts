import {BookOpen, Briefcase, Code, Home, Mail} from "lucide-react";

/** Main nav links and icons; consumed by components/home/navigation.tsx. isCta marks styling (e.g. Contact). */
export const navItems = [
    {href: "/", label: "Home", icon: Home, isCta: false},
    {href: "/projects", label: "Projects", icon: Code, isCta: false},
    {href: "/services", label: "Services", icon: Briefcase, isCta: false},
    {href: "/blog", label: "Blog", icon: BookOpen, isCta: false},
    {href: "/contact", label: "Contact", icon: Mail, isCta: true}, // Mark Contact as CallToAction
];