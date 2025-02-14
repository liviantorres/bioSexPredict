import styled from "styled-components";
import { useState } from "react";
import ModalExibir from "./ModalExibir";
import ModalEditar from "./ModalEditar";
import ModalExcluir from "./ModalExcluirIndividuo";

const CardContainer = styled.div`
  background: #e0edff;
  width: 180px;
  height: 230px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: start;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const ImagePlaceholder = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10%;
  align-items: center;
`;

const InfoText = styled.p`
  font-size: 14px;
  font-family: "Inter", sans-serif;
  width: 100%;
`;

const individuos = [
  {
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    descricao:
      "Professor de Matemática, com 10 anos de experiência no ensino superior.",
    localizacao: "São Paulo, SP",
    id: "PROF12345",
    frontalS_A: "15cm",
    frontalL_R: "10cm",
    frontalS_R: "12cm",
    maxilarDireitoS_I: "18cm",
    frontalS_I: "14cm",
    frontalS_L: "9cm",
    frontalA_R: "7cm",
    sexo: "Sexo Feminino",
  },
  {
    cargo: "Servidor",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    descricao:
      "Responsável pela logística do campus, com foco em atendimento a alunos e professores.",
    localizacao: "Fortaleza, CE",
    id: "SERV12345",
    frontalS_A: "13cm",
    frontalL_R: "8cm",
    frontalS_R: "10cm",
    maxilarDireitoS_I: "16cm",
    frontalS_I: "12cm",
    frontalS_L: "7cm",
    frontalA_R: "6cm",
    sexo: "Sexo Masculino",
  },

  {
    cargo: "Estudante",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    descricao:
      "Estudante de Engenharia de Software, interessado em Inteligência Artificial.",
    localizacao: "Rio de Janeiro, RJ",
    id: "ESTU12345",
    frontalS_A: "14cm",
    frontalL_R: "9cm",
    frontalS_R: "11cm",
    maxilarDireitoS_I: "17cm",
    frontalS_I: "13cm",
    frontalS_L: "8cm",
    frontalA_R: "7cm",
    sexo: "Sexo Masculino",
  },
  {
    cargo: "Administrador",
    img: "https://randomuser.me/api/portraits/women/4.jpg",
    descricao:
      "Gestora administrativa da instituição, com foco em melhoria contínua e processos organizacionais.",
    localizacao: "Belo Horizonte, MG",
    id: "ADM12345",
    frontalS_A: "16cm",
    frontalL_R: "10cm",
    frontalS_R: "13cm",
    maxilarDireitoS_I: "19cm",
    frontalS_I: "15cm",
    frontalS_L: "9cm",
    frontalA_R: "8cm",
    sexo: "Sexo Feminino",
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

const CardIndividuo = ({ counter, img, id, sexo }) => {
  const [modal, setModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const openEditar = () => {
    setModal(false);
    setModalEditar(true);
  };

  const openExcluir = () => {
    setModal(false);
    setModalExcluir(true);
  };

  return (
    <>
      <CardContainer onClick={() => setModal(true)}>
        <ImagePlaceholder src={img} alt="Foto do indivíduo" />
        <InfoText>{id}</InfoText>
        <InfoText>{sexo}</InfoText>
      </CardContainer>

      {modal && (
        <ModalExibir
          onClose={() => setModal(false)}
          individuo={individuos[counter]}
          modalEditar={openEditar}
          modalExcluir={openExcluir}
        />
      )}
      {modalEditar && (
        <ModalEditar
          onClose={() => setModalEditar(false)}
          individuo={individuos[counter]}
        />
      )}

      {modalExcluir && (
        <ModalExcluir
          onClose={() => setModalExcluir(false)}
          individuo={individuos[counter]}
        />
      )}
    </>
  );
};

export default CardIndividuo;
