import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "redux/modules/authSlice";
import { useNavigate } from "react-router-dom";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleLogout = async () => {
    try {
      await dispatch(logoutSuccess());
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <NavBar>
      <HomeButton onClick={() => navigate("/")}>홈으로</HomeButton>
      <ButtonContainer>
        {isLoggedIn ? (
          <>
            <ProfileButton onClick={() => navigate("/mypage")}>
              내 프로필
            </ProfileButton>
            <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
          </>
        ) : (
          <>
            <AuthButton onClick={() => navigate("/auth")}>로그인</AuthButton>
            <AuthButton onClick={() => navigate("/auth")}>회원가입</AuthButton>
          </>
        )}
      </ButtonContainer>
    </NavBar>
  );
}

const NavBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  align-items: center;
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const HomeButton = styled.button`
  width: 90px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AuthButton = styled.button`
  width: 90px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
`;

const ProfileButton = styled.button`
  width: 90px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
`;

export default Layout;
