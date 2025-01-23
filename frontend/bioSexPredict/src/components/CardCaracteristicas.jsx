import React, { useState } from "react";
import styled from "styled-components";

const ContainerCard = styled.div`
    background-color: #E0EDFF;
    border-radius: 6px;
    display: flex;
    padding: 20px;
    align-items: center;
`;

const DivLeft = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const PerfilImagem = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    object-position: center; 
`;

const InputFile = styled.input`
    display: none;
`;

const DivRight = styled.div`
    margin-left: 20px;
    display: flex;
    flex-direction: column;
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
    <ContainerCard>
      <DivLeft>
        <label htmlFor="fileInput">
          <PerfilImagem src={image} alt="Imagem de Perfil" />
        </label>
        <InputFile
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="">Localização:</label>
        <input type="text" />
        <label htmlFor="">Descrição:</label>
        <input type="text" />
      </DivLeft>
      <DivRight>
        <label htmlFor="">Identificador: *</label>
        <input type="text" />
        <p>Extração de medidas</p>
        <label htmlFor="">Seio Frontal:*</label>
        <input type="text" />
        <label htmlFor="">Seio esfenóide:*</label>
        <input type="text" />
        <label htmlFor="">Seio Maxilar:*</label>
        <input type="text" />
        <label htmlFor="">Seio maxilar direito:*</label>
        <input type="text" />
        <label htmlFor="">Seios Maxilar esquerdo:*</label>
        <input type="text" />
      </DivRight>
    </ContainerCard>
  );
};

export default CardCaracteristicas;
