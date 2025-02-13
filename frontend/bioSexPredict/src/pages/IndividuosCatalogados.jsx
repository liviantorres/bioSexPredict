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
  {
    nome: "Maria Silva",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    descricao: "Professor de Matemática, com 10 anos de experiência no ensino superior.",
    localizacao: "São Paulo, SP",
    id: "PROF12345",
    frontalS_A: "15cm",
    frontalL_R: "10cm",
    frontalS_R: "12cm",
    maxilarDireitoS_I: "18cm",
    frontalS_I: "14cm",
    frontalS_L: "9cm",
    frontalA_R: "7cm",
    sexo: "Sexo Feminino" 
  },
 {
    nome: "Carlos Oliveira",
    cargo: "Servidor",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    descricao: "Responsável pela logística do campus, com foco em atendimento a alunos e professores.",
    localizacao: "Fortaleza, CE",
    id: "SERV12345",
    frontalS_A: "13cm",
    frontalL_R: "8cm",
    frontalS_R: "10cm",
    maxilarDireitoS_I: "16cm",
    frontalS_I: "12cm",
    frontalS_L: "7cm",
    frontalA_R: "6cm",
    sexo: "Sexo Masculino" 
  },
  
  {
    nome: "Lucas Pereira",
    cargo: "Estudante",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    descricao: "Estudante de Engenharia de Software, interessado em Inteligência Artificial.",
    localizacao: "Rio de Janeiro, RJ",
    id: "ESTU12345",
    frontalS_A: "14cm",
    frontalL_R: "9cm",
    frontalS_R: "11cm",
    maxilarDireitoS_I: "17cm",
    frontalS_I: "13cm",
    frontalS_L: "8cm",
    frontalA_R: "7cm",
    sexo: "Sexo Masculino"
  },
  {

    nome: "Fernanda Souza",
    cargo: "Administrador",
    img: "https://randomuser.me/api/portraits/women/4.jpg",
    descricao: "Gestora administrativa da instituição, com foco em melhoria contínua e processos organizacionais.",
    localizacao: "Belo Horizonte, MG",
    id: "ADM12345",
    frontalS_A: "16cm",
    frontalL_R: "10cm",
    frontalS_R: "13cm",
    maxilarDireitoS_I: "19cm",
    frontalS_I: "15cm",
    frontalS_L: "9cm",
    frontalA_R: "8cm",
    sexo: "Sexo Feminino"
  },
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
  const [modal, setModal] = useState(false);
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
            counter={index}
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
      {modal && <ModalEditar onClose={()=> setModal(false)}/>}
      
    </ContainerPrincipal>
  );
};

export default IndividuosCatalogados;
