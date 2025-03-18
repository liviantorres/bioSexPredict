import { useState, useEffect } from "react";
import styled from "styled-components";
import { HiIdentification } from "react-icons/hi2";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import CardIndividuo from "../components/CardIndividuo";
import axiosInstance from "../redux/axios_instance";

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

const IndividuosCatalogados = () => {
  const [individuos, setIndividuos] = useState([]);
  const [modal, setModal] = useState(false);
  const itensPorPagina = 8;
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [onFetch, setOnFetch] = useState(false);

  useEffect(() => {
    fetchData();
    if (onFetch) {
      setOnFetch(false);
    }
  }, [onFetch]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/individuals/");
      setIndividuos(response.data);
    } catch (error) {
      console.error("Erro ao buscar indivíduos:", error);
    }
  };

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
        {individuosPaginados.length > 0 ? (
          individuosPaginados.map((individuo) => (
            <CardIndividuo
              id={individuo.id}
              img={individuo.img}
              identificator={individuo.identificador}
              sexo={individuo.sexo}
              onFetch={() => setOnFetch(true)}
            />
          ))
        ) : (
          <p style={{ color: "white" }}>Nenhum indivíduo encontrado.</p>
        )}
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

      {modal && <ModalEditar onClose={() => setModal(false)} />}
    </ContainerPrincipal>
  );
};

export default IndividuosCatalogados;
