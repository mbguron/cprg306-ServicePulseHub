import "./globals.css";

export const metadata = {
  title: "ServicePulse Hub",
  description: "Service management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
