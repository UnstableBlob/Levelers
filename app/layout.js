import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import NavbarWithExclusion from "@/components/NavbarWithExclusion";
import Footer from "@/components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Levelers - Creative Digital Agency",
  description: "Transform your ideas into reality with our expert team. We specialize in app development, web design, UI/UX, branding, and digital marketing solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
  <NavbarWithExclusion/>

        {children}

        {/* <Footer/> */}
      </body>
    </html>
  );
}
