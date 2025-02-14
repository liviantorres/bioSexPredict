import React from "react";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
 position: relative;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-family: "Inter", sans-serif;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#e74c3c" : "#bdc3c7")};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 48%;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => (props.primary ? "#c0392b" : "#95a5a6")};
  }
`;

const CloseButton = styled(IoIosClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #333;

  &:hover {
    color: #e74c3c;
  }
`;

const ModalExcluirIndividuo = ({ onClose }) => {
  return (
    <FullScreenContainer>
      <ModalContainer>
        <CloseButton onClick={onClose} />
        <Title>Confirmar Exclusão</Title>
        <Message>Tem certeza de que deseja excluir este indivíduo? Esta ação não pode ser desfeita.</Message>
        <ButtonContainer>
          <Button primary>
            Sim, excluir
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ButtonContainer>
      </ModalContainer>
    </FullScreenContainer>
  );
};

export default ModalExcluirIndividuo;
