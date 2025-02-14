import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiEdit, FiLogOut } from "react-icons/fi";

const NavbarContainer = styled.nav`
  background-color: #1c3d67;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 30px;
  font-family: "Poppins", sans-serif;
`;

const TextOverlay = styled.p`
  color: #ffffff;
  font-size: 22px;
  font-weight: 300;
  font-style: italic;
`;

const StyledNavLink = styled(NavLink)`
  font-weight: 400;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 8px 15px;
  transition: 0.3s ease-in-out;

  &.active {
    font-weight: 700;
  }

  &:hover {
    color: #a1c4f1;
  }
`;

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProfileContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  min-width: 180px;
  z-index: 100;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  & a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 15px;
    color: #333;
    text-decoration: none;
    font-size: 15px;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: #f1f1f1;
    }
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContainer>
      <DivContainer>
        <img src="/bioSexPredict.svg" alt="Logo" width={40} />
        <TextOverlay>Bio Sex Predict</TextOverlay>
      </DivContainer>

      <DivContainer>
        <StyledNavLink to="/inicio/catalogar-individuo">
          Catalogar indivíduo
        </StyledNavLink>

        <StyledNavLink to="/inicio/individuos-catalogados">
          Indivíduos catalogados
        </StyledNavLink>

        <ProfileContainer onClick={() => setIsOpen(!isOpen)}>
          <FaRegCircleUser size={34} color="white" />
          <DropdownMenu isOpen={isOpen}>
            <NavLink to="/inicio/perfil">
              <FiEdit size={16} /> Editar Perfil
            </NavLink>
            <NavLink to="/logout">
              <FiLogOut size={16} color="red" /> Sair
            </NavLink>
          </DropdownMenu>
        </ProfileContainer>
      </DivContainer>
    </NavbarContainer>
  );
};

export default Navbar;
