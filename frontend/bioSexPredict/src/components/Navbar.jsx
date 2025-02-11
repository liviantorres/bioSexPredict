import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

const NavbarContainer = styled.nav`
  background-color: #1c3d67;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px 10px 30px;
  & ul {
    display: flex;
    gap: 20px;
    list-style-type: none;

    & a {
      color: #ffff;
      text-decoration: none;
    }

    & a.active {
      opacity: 1;
    }
  }
`;

const TextOverlay = styled.p`
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 200;
  font-style: italic;
`;

const StyledNavLink = styled(NavLink)`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 5px 10px;

  &.active {
    font-weight: 700;
    text-decoration: none;
  }

  &:hover {
    color: #a1c4f1;
  }
`;

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;

  & div {
    margin: 0px 20px 0px 20px;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <DivContainer>
        <img src="/bioSexPredict.svg" alt="" />
        <TextOverlay>Bio Sex Predict</TextOverlay>
      </DivContainer>

      <DivContainer>
        <StyledNavLink to="/inicio/catalogar-individuo">
          Catalogar indivíduo
        </StyledNavLink>

        <StyledNavLink to="/inicio/individuos-catalogados">
          Indivíduos catalogados
        </StyledNavLink>

        <div>
          <FaRegCircleUser size={34} color="white" />
        </div>
      </DivContainer>
    </NavbarContainer>
  );
};

export default Navbar;
