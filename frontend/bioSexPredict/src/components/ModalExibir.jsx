import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { darken } from "polished";


const ModalOverlay = styled.div`
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

const ContainerCard = styled.div`
  position: relative;
  background-color: #e0edff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const DivLeft = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #ccc;
  padding: 0px 20px 20px 20px;
`;

const PerfilImagem = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10%;
  object-fit: cover;
  object-position: center;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 14px;
`;

const DivRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 30px 30px 30px;
`;

const Label = styled.label`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  display: flex;
  gap: 10px;
  margin-top: 10px;
  font-size: 14px;
`;

const P = styled.label`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 14px;
  padding-bottom: 6px;
  margin-top: 10px;
  color: #000000c3;
  max-width: 300px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const DivMiddle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.color ? props.color : "#f8cc7b")};
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #000;
  border-radius: 8px;
  margin-top: 25px;
  width: 100%;
  height: 35px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.color ? darken(0.1, props.color) : darken(0.1, "#f8cc7b")};
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 80%;
  padding: 20px;
  justify-content: space-around;
`;

const CloseButton = styled(IoIosClose)`
  position: absolute;
  top: 3px;
  right: 8px;
  cursor: pointer;
  font-size: 30px;
  color: #333;

  &:hover {
    color: #1957a7;
  }
`;

const ModalExibir = ({ onClose, individuo, modalEditar }) => {
  
  return (
    <ModalOverlay>
      <ContainerCard>
        <CloseButton onClick={onClose} />

        <Div>
          <DivLeft>
            <ImageContainer>
              <Label htmlFor="fileInput">
                <PerfilImagem src={individuo.img} alt="Imagem de Perfil" />
              </Label>
            </ImageContainer>

            <Label htmlFor="">Localização:</Label>
            <P>{individuo.localizacao}</P>
            <Label htmlFor="">Descrição:</Label>
            <P>{individuo.descricao}</P>
          </DivLeft>
          <DivMiddle>
            <Label htmlFor="">Identificador:</Label>
            <P>{individuo.id}</P>

            <Label htmlFor="">Frontal S-A:</Label>

            <P>{individuo.frontalS_A}</P>
            <Label htmlFor="">Frontal L-R:</Label>
            <P>{individuo.frontalL_R}</P>
            <Label htmlFor="">Frontal S-R:</Label>
            <P>{individuo.frontalS_R}</P>
            <Label htmlFor="">Maxilar direito S-I:</Label>
            <P>{individuo.maxilarDireitoS_I}</P>
          </DivMiddle>
          <DivRight>
            <Label htmlFor="">Frontal S-I:</Label>
            <P>{individuo.frontalS_I}</P>
            <Label htmlFor="">Frontal S-L:</Label>
            <P>{individuo.frontalS_L}</P>
            <Label htmlFor="">Frontal A-R:</Label>
            <P>{individuo.frontalA_R}</P>
          </DivRight>
        </Div>
        <ContainerBotoes>
          <Button onClick={modalEditar}>Editar indivíduo</Button>
          <Button color="#D9D9D9">Excluir indivíduo</Button>
        </ContainerBotoes>
      </ContainerCard>
     
    </ModalOverlay>
  );
};

export default ModalExibir;
