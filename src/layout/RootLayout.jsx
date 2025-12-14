import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "../ui/layout/Header";
import Footer from "../ui/layout/Footer";
// import ResponsiveNav from "../ui/layout/ResponsiveNav";
import useAuth from "../hooks/useAuth";
import useGetHome from "../hooks/home/useGetSlider";
import Preloader from "../ui/loaders/Preloader";
import useGetHelp from "../hooks/useGetHelp";

export default function RootLayout() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);

  const auth = useAuth();
  const { isLoading: sliderLoading } = useGetHome();
  const { isLoading: registerLoading } = useGetHelp();

  if (auth.loading || sliderLoading || registerLoading) return <Preloader />;

  return (
    <>
      <Header auth={auth} />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* <ResponsiveNav /> */}
    </>
  );
}
