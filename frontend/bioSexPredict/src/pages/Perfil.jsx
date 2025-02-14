import { useState } from "react";
import styled from "styled-components";
import { HiIdentification } from "react-icons/hi2";

const ContainerPrincipal = styled.div`
  background-color: #1957a7;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  width: 90%;
  border-bottom: 2px solid #ffffff81;
  margin: 20px 0;
  padding-bottom: 8px;

  & p {
    font-family: "Inter", sans-serif;
    color: white;
  }
`;

const ContainerCard = styled.div`
  background-color: #e0edff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 16px;
  width: 25%;
`;

const PerfilImagem = styled.img`
  width: 140px;
  height: 140px;
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

const Label = styled.label`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-left: 6px;
  outline: none;
  width: 100%;
  height: 30px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #1957a7;
    box-shadow: 0 0 5px rgba(25, 87, 167, 0.5);
  }
`;

const Button = styled.button`
  background-color: #f8cc7b;
  color: #333;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 15px;
  width: 82%;
  height: 35px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #f7c168;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #e0b86d;
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(248, 204, 123, 0.5);
  }
`;

const InputContainer = styled.div`
  width: 80%; 
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
`;

const LabelImg = styled.div`
  font-family: "Inter", sans-serif;
  display: flex;
  gap: 10px;
  margin-top: 10px;
  font-size: 14px;
`;

const Perfil = ({ user = {} }) => {
  const [formData, setFormData] = useState({
    nome: user.nome || "",
    email: user.email || "",
    senhaAtual: "",
    novaSenha: "",
    imageUrl: "/imagePerfil.svg", 
  });


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Dados salvos:", formData);
  };

  return (
    <ContainerPrincipal>
      <DivContainer>
        <HiIdentification color="white" size={30} />
        <p>Editar Perfil</p>
      </DivContainer>
      <ContainerCard>
        <ImageContainer>
          <LabelImg htmlFor="fileInput">
            <PerfilImagem
              src={formData.imageUrl} 
              alt="Imagem de Perfil"
              onClick={() => document.getElementById("fileInput").click()} 
            />
          </LabelImg>
          <InputFile
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange} 
          />
        </ImageContainer>

        <InputContainer>
          <Label>Nome:</Label>
          <Input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            type="text"
          />
        </InputContainer>

        <InputContainer>
          <Label>Email:</Label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
        </InputContainer>

        <InputContainer>
          <Label>Senha Atual:</Label>
          <Input
            name="senhaAtual"
            value={formData.senhaAtual}
            onChange={handleChange}
            type="password"
          />
        </InputContainer>

        <InputContainer>
          <Label>Nova Senha:</Label>
          <Input
            name="novaSenha"
            value={formData.novaSenha}
            onChange={handleChange}
            type="password"
          />
        </InputContainer>

        <Button onClick={handleSubmit}>Salvar</Button>
      </ContainerCard>
    </ContainerPrincipal>
  );
};

export default Perfil;
