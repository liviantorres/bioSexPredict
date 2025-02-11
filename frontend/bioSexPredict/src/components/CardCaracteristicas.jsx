import React, { useState } from "react";
import styled from "styled-components";

const FullScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContainerCard = styled.div`
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
`;

const Textarea = styled.textarea`
  border: 1px solid #cccc;
  border-radius: 6px;
  padding: 6px;
  outline: none;
  width: 100%;
  resize: vertical;
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
  margin-top: 25px;
  width: 100%;
  height: 35px;
  border: none;
  cursor: pointer;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 1s ease;
  &:hover {
    background-color: #e0b86d;
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(248, 204, 123, 0.6);
  }
`;

const CardCaracteristicas = () => {
  const [image, setImage] = useState("/imagePerfil.svg");

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
        <Titulo>Características</Titulo>
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
            <Input type="text" />
            <Label htmlFor="">Descrição:</Label>
            <Textarea type="" />
          </DivLeft>
          <DivMiddle>
            <Label htmlFor="">
              Identificador: <Asterisk>*</Asterisk>
            </Label>
            <Input type="text" />

            <P>Extração de medidas</P>

            <Label htmlFor="">
              Frontal S-A: <Asterisk>*</Asterisk>
            </Label>

            <Input type="text" />
            <Label htmlFor="">
              Frontal L-R: <Asterisk>*</Asterisk>
            </Label>
            <Input type="text" />
            <Label htmlFor="">
              Frontal S-R:<Asterisk>*</Asterisk>
            </Label>
            <Input type="text" />
            <Label htmlFor="">
              Maxilar direito S-I: <Asterisk>*</Asterisk>
            </Label>
            <Input type="text" />
          </DivMiddle>
          <DivRight>
            <Label htmlFor="">
              Frontal S-I: <Asterisk>*</Asterisk>
            </Label>
            <Input type="text" />
            <Label htmlFor="">
              Frontal S-L: <Asterisk>*</Asterisk>
            </Label>
            <Input type="text" />
            <Label htmlFor="">
              Frontal A-R: <Asterisk>*</Asterisk>
            </Label>
            <Input type="text" />
          </DivRight>
        </Div>
      </ContainerCard>
      <Button>Prever sexo</Button>
    </FullScreenContainer>
  );
};

export default CardCaracteristicas;
