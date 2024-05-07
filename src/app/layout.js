import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar'
import { getServerSession } from "next-auth";
// import SessionProvider from "@/utils/SessionProvider";
import AuthProvider from "@/utils/AuthProvider";
import Footer from "@/components/Footer";
import ReduxProvider from "@/reduxProvider/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className='bg-white h-screen'>
        <AuthProvider session={session}>
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
