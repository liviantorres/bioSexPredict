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

const CardIndividuo = ({ id, img, identificator, sexo }) => {
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
        <InfoText>{identificator}</InfoText>
        <InfoText>{sexo}</InfoText>
      </CardContainer>

      {modal && (
        <ModalExibir
          onClose={() => setModal(false)}
          id={id}
          modalEditar={openEditar}
          modalExcluir={openExcluir}
        />
      )}
      {modalEditar && (
        <ModalEditar
          onClose={() => setModalEditar(false)}
          id={id}
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
