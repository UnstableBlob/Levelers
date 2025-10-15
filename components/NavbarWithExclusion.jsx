"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

const excludedPages = [
  "/commission",
  "/auth",
  "/login",
  "/signup"
];

export default function NavbarWithExclusion() {
  const pathname = usePathname();
  if (excludedPages.includes(pathname)) {
    return null;
  }
  return <Navbar />;
}
