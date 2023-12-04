import Layout from "components/Layout";
import React from "react";
import styled from "styled-components";

function MyPage() {
  return (
    <div>
      <Layout />
      <ProfileContainer>
        <ProfileBox>
          <Title>프로필 관리</Title>
          <ImageSection></ImageSection>
          <Nickname>닉네임란</Nickname>
          <ContentSection>소개란입니다</ContentSection>
          <EditButton>수정하기</EditButton>
        </ProfileBox>
      </ProfileContainer>
    </div>
  );
}

const ProfileContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ProfileBox = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #777;
  border-radius: 20px;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
`;

const ImageSection = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
`;

const Nickname = styled.span`
  width: 100px;
  height: 30px;
  background-color: lightcoral;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ContentSection = styled.p`
  background-color: red;
`;

const EditButton = styled.button`
  width: 90px;
  height: 50px;
  border-radius: 10px;
  border: 0px solid transparent;
`;

export default MyPage;
