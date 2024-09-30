import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Nav";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata = {
  title: "SenAuto",
  description: "S'entrainer gratuitement au code de la route",
};

export default async function RootLayout({ children }: Readonly<
  { children: React.ReactNode }>) {
    const session= await auth();
  return (
    <SessionProvider session={session}>
      <html lang='en'>
      <body className="bg-white text-black max-w-full">
        <div className="mx-auto max-w-full h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
    </SessionProvider>
    
  );
}