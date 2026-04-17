import LoggedNavBar from "@/components/layouts/loggedNavBar";
import Footer from "@/components/layouts/Footer";

export default function CustomerLayout({ children }) {
  return (
    <>
      <LoggedNavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
