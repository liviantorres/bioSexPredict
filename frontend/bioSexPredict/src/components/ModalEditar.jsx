import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { darken } from "polished";

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

const ContainerCard = styled.div`
  position: relative;
  background-color: #e0edff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
  cursor: pointer;
  object-fit: cover;
  object-position: center;
`;

const InputFile = styled.input`
  display: none;
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
  display: flex;
  gap: 10px;
  margin-top: 10px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
`;

const P = styled.label`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 15px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 6px;
  margin-top: 10px;
`;

const Asterisk = styled.p`
  color: red;
`;

const Input = styled.input`
  border: 1px solid #cccc;
  border-radius: 6px;
  padding: 6px 0px 6px 0px;
  outline: none;
  padding-left: 6px;
  margin-top: 6px;
  font-family: 'Inter', sans-serif;
`;

const Textarea = styled.textarea`
  border: 1px solid #cccc;
  border-radius: 6px;
  padding: 6px;
  outline: none;
  width: 100%;
  resize: vertical;
  font-family: 'Inter', sans-serif;
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

const Titulo = styled.h2`
  width: 100%;
  background-color: #b1c1d6;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 18px;
  padding: 10px 0px 10px 0px;
  border-radius: 6px 6px 0px 0px;
`;

const Button = styled.button`
  background-color: #f8cc7b;
  font-family: "Inter", sans-serif;
  color: #000;
  border-radius: 4px;
  margin: 25px;
  width: 30%;
  height: 30px;
  border: none;
  cursor: pointer;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    background-color: darken(0.1, "#f8cc7b");
    transform: scale(1.03);
    box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1);
  }
`;

const CloseButton = styled(IoIosClose)`
  position: absolute;
  top: 6px;
  right: 8px;
  cursor: pointer;
  font-size: 30px;
  color: #333;

  &:hover {
    color: #1957a7;
  }
`;

const ModalEditar = ({ onClose, individuo }) => {
  const [image, setImage] = useState(individuo.img || "/imagePerfil.svg");
  const [localizacao, setLocalizacao] = useState(individuo.localizacao || "");
  const [descricao, setDescricao] = useState(individuo.descricao || "");
  const [identificador, setIdentificador] = useState(individuo.id || "");
  const [frontalSA, setFrontalSA] = useState(individuo.frontalS_A || "");
  const [frontalLR, setFrontalLR] = useState(individuo.frontalL_R || "");
  const [frontalSR, setFrontalSR] = useState(individuo.frontalS_R || "");
  const [maxilarDirSI, setMaxilarDirSI] = useState(individuo.maxilarDireitoS_I || "");
  const [frontalSI, setFrontalSI] = useState(individuo.frontalS_I || "");
  const [frontalSL, setFrontalSL] = useState(individuo.frontalS_L || "");
  const [frontalAR, setFrontalAR] = useState(individuo.frontalA_R || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FullScreenContainer>
      <ContainerCard>
        <CloseButton onClick={onClose} />
        <Titulo>Editar Indivíduo</Titulo>
        <Div>
          <DivLeft>
            <ImageContainer>
              <Label htmlFor="fileInput">
                <PerfilImagem src={image} alt="Imagem de Perfil" />
              </Label>
              <InputFile
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </ImageContainer>

            <Label htmlFor="">Localização:</Label>
            <Input
              type="text"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            />
            <Label htmlFor="">Descrição:</Label>
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </DivLeft>
          <DivMiddle>
            <Label htmlFor="">
              Identificador: <Asterisk>*</Asterisk>
            </Label>
            <Input
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
            />

            <P>Extração de medidas</P>

            <Label htmlFor="">
              Frontal S-A: <Asterisk>*</Asterisk>
            </Label>
            <Input
              type="text"
              value={frontalSA}
              onChange={(e) => setFrontalSA(e.target.value)}
            />
            <Label htmlFor="">
              Frontal L-R: <Asterisk>*</Asterisk>
            </Label>
            <Input
              type="text"
              value={frontalLR}
              onChange={(e) => setFrontalLR(e.target.value)}
            />
            <Label htmlFor="">
              Frontal S-R:<Asterisk>*</Asterisk>
            </Label>
            <Input
              type="text"
              value={frontalSR}
              onChange={(e) => setFrontalSR(e.target.value)}
            />
            <Label htmlFor="">
              Maxilar direito S-I: <Asterisk>*</Asterisk>
            </Label>
            <Input
              type="text"
              value={maxilarDirSI}
              onChange={(e) => setMaxilarDirSI(e.target.value)}
            />
          </DivMiddle>
          <DivRight>
            <Label htmlFor="">
              Frontal S-I: <Asterisk>*</Asterisk>
            </Label>
            <Input
              type="text"
              value={frontalSI}
              onChange={(e) => setFrontalSI(e.target.value)}
            />
            <Label htmlFor="">
              Frontal S-L: <Asterisk>*</Asterisk>
            </Label>
            <Input
              type="text"
              value={frontalSL}
              onChange={(e) => setFrontalSL(e.target.value)}
            />
            <Label htmlFor="">
              Frontal A-R: <Asterisk>*</Asterisk>
            </Label>
            <Input
              type="text"
              value={frontalAR}
              onChange={(e) => setFrontalAR(e.target.value)}
            />
          </DivRight>
        </Div>
        <Button>Salvar</Button>
      </ContainerCard>
    </FullScreenContainer>
  );
};

export default ModalEditar;
