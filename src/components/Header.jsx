import Tabs from "./Tabs";
import styled from "styled-components";
import backgroundImg from "../assets/에스파1.png";

export default function Header() {
  return (
    <>
      <Title>에스파 팬레터함</Title>
      <Container $image={backgroundImg}>
        <Tabs />
      </Container>
    </>
  );
}

const Container = styled.section`
  width: 100%;
  height: 240px;
  background-image: url(${({ $image }) => $image});
  background-size: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: black;
`;
