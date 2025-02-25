import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlApi } from '../utils/urlRequests';

const ContainerLogin = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1957a7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 0px 0px 10px;
`;

const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 50%;
  border-radius: 10px;
  overflow: hidden;
`;

const DivLeft = styled.div`
  flex: 1.2;
  position: relative;
`;

const TextOverlay = styled.p`
  position: absolute;
  bottom: 10px;
  left: 25%;
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 200;
  font-style: italic;
  text-align: center;
  z-index: 2;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.3)
  );
  border-radius: 10px 0px 0px 10px;
  pointer-events: none;
`;

const DivRight = styled.div`
  flex: 1;
  font-family: "Archivo", sans-serif;
  background-color: #e0edff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 0px 10px 10px 0px;
  & label {
    font-size: 13px;
  }
  & h2 {
    font-weight: 300;
    position: relative;
    padding-bottom: 5px;
  }
  & h2::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #cccc;
  }

  & button {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffff;
    background-color: #1957a7;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    padding: 6px 0px 6px 0px;
    margin: 8px 0px 8px 0px;
    transition: background-color 1s, transform 1s;
  }
  & button:hover {
    background-color: #347ad4;
    transform: scale(1.01);
  }

  & input {
    border: 1px solid #cccc;
    border-radius: 6px;
    padding: 6px 0px 6px 0px;
    outline: none;
    padding-left: 6px;
  }

  & p {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    text-align: center;
  }

  & a {
    text-decoration: none;
    font-weight: 600;
    color: #1957a7;
    cursor: pointer;
  }

  & a:hover {
    color: #1957a7c5;
  }
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await fetch(`${urlApi}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerLogin>
      <DivContainer>
        <DivLeft>
          <StyledImage src="login.png" alt="" />
          <GradientOverlay />
          <TextOverlay>Bio Sex Predict</TextOverlay>
        </DivLeft>
        <DivRight>
          <h2>Cadastrar</h2>
          <label htmlFor="">Nome:</label>
          <input name="name" type="text" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="">Email:</label>
          <input name="email" type="text" onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="">Senha:</label>
          <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={onSubmit}>Cadastrar</button>
          <p>
            Já possui uma conta? <a href="/">Entrar</a>
          </p>
        </DivRight>
      </DivContainer>
    </ContainerLogin>
  );
};

export default Register;
