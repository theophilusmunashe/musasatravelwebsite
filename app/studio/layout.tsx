export const metadata = {
  title: "Musasa Travel Studio",
  description: "Content studio for Musasa Travel & Tours",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
