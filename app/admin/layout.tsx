import Navbar from "@/components/Navbar";
import type { Metadata } from "next"; 

 
export const metadata: Metadata = {
  title: "Admin | Appointments", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main>
        {/* <Navbar /> */}
        <div className=" px-20 mt-10 max-md:px-2 max-lg:px-3">
        {children}
        </div>
      </main>
  );
}
