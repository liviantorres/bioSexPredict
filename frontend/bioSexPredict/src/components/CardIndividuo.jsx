import styled from "styled-components";

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

const CardIndividuo = ({ img, id, sexo }) => {
  return (
    <CardContainer>
      <ImagePlaceholder src={img} alt="Foto do indivíduo" />
      <InfoText>{id}</InfoText>
      <InfoText>{sexo}</InfoText>
    </CardContainer>
  );
};

export default CardIndividuo;
