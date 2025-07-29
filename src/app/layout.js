
import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import "./globals.css";

export const metadata = {
  title: "Wall Damage Analysis and Cost Estimation",
  description: "Advanced wall damage analysis and cost estimation system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 min-h-screen">
        <Header />
        <div className="relative">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
