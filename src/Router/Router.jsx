import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import ViewPage from "../components/ViewPage";
import { Route, Routes } from 'react-router-dom'
import Footer from "../components/Footer";

const Router = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ViewPage />} />
      </Routes>

      <Footer />
    </>
  );
};
export default Router