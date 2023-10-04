import { Container } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Navbar from "../Navbar";

// Pass the child props
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW={'5xl'} minH="calc(60vh)" mt={12}>
        {children}
        <Outlet />
      </Container>
      <Footer /> 
    </>
  );
};

export default Layout;
