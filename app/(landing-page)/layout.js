import { Footer, Navbar } from "@/components";
import { Inter } from "next/font/google";
import "../globals.css";
export const metadata = {
  title: "Quiz Game",
  description: "This is Quiz Game",
};

const inter = Inter({ subsets: ["latin"] });

export default function LandingLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={"flex flex-col justify-between min-h-screen bg-primary pt-8"}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body >
    </html >
  );
}
