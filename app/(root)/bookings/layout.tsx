import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden bg-[#F5F4F2] font-sans text-[#1A1917] antialiased ${inter.className}`}
    >
      {children}
    </div>
  );
}
