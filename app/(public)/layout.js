import NavBar from "@/components/layouts/NavBar";
import Footer from "@/components/layouts/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
