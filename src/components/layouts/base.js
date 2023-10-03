import Footer from "../Footer";
import Navbar from "../Navbar";

// Pass the child props
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer /> 
    </>
  );
};

export default Layout;
