export const metadata = {
  title: "Musasa Travel Studio",
  description: "Private content studio for Musasa Travel & Tours",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZW">
      <body>{children}</body>
    </html>
  );
}
