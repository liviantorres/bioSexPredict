import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const LayoutContainer = styled.div``;

const PageLayout = () => {
  return (
    <LayoutContainer>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </LayoutContainer>
  );
};

PageLayout.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default PageLayout;
