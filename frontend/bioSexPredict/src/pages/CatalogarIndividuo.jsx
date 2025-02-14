import styled from "styled-components";
import { HiIdentification } from "react-icons/hi2";
import CardCaracteristicas from "../components/CardCaracteristicas";

const ContainerPrincipal = styled.div`
  background-color: #1957a7;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  width: 90%;
  border-bottom: 2px solid #ffffff81;
  margin-top: 20px;
  padding-bottom: 8px;
  & p {
    font-family: "Inter", sans-serif;
    color: white;
  }
`;

const CatalogarIndividuo = () => {
  return (
    <ContainerPrincipal>
      <DivContainer>
        <HiIdentification color="white" size={30} />
        <p>Adicionar novo indivíduo</p>
      </DivContainer>
      <CardCaracteristicas />
    </ContainerPrincipal>
  );
};

export default CatalogarIndividuo;
