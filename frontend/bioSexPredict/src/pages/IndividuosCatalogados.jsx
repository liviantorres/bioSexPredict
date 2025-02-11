import { useState } from "react";
import styled from "styled-components";
import { HiIdentification } from "react-icons/hi2";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import CardIndividuo from "../components/CardIndividuo";

const ContainerPrincipal = styled.div`
  background-color: #1957a7;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width: fit-content;
  margin: auto;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 20px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const individuos = [
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Feminino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Feminino" },
  { img: "/imagePerfil.svg", id: "ID1231FASF", sexo: "Sexo Masculino" },
];

const IndividuosCatalogados = () => {
  const itensPorPagina = 8;
  const [paginaAtual, setPaginaAtual] = useState(0);

  const inicio = paginaAtual * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const individuosPaginados = individuos.slice(inicio, fim);

  return (
    <ContainerPrincipal>
      <DivContainer>
        <HiIdentification color="white" size={30} />
        <p>Indivíduos catalogados</p>
      </DivContainer>

      <GridContainer>
        {individuosPaginados.map((individuo, index) => (
          <CardIndividuo
            key={index}
            id={individuo.id}
            sexo={individuo.sexo}
            img={individuo.img}
          />
        ))}
      </GridContainer>

      <PaginationContainer>
        <PageButton
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual === 0}
        >
          <FaArrowLeft />
        </PageButton>

        <PageButton
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          disabled={fim >= individuos.length}
        >
          <FaArrowRight />
        </PageButton>
      </PaginationContainer>
    </ContainerPrincipal>
  );
};

export default IndividuosCatalogados;
