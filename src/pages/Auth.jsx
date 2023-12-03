import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  loginThunk,
  signUpThunk,
  checkToken,
} from "../redux/modules/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [authMode, setAuthMode] = useState("login");
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const apiUrl = "https://moneyfulpublicpolicy.co.kr";

  const fetchAuth = async () => {
    try {
      const response = await axios.get(apiUrl);
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (authMode === "login") {
        dispatch(loginThunk({ id, password }));
        navigate("/");
        console.log("login success");
      } else if (authMode === "signup") {
        dispatch(signUpThunk({ id, password, nickname }));
        setAuthMode("login");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  const toggleAuthMode = () => {
    setAuthMode((prevMode) => {
      return prevMode === "login" ? "signup" : "login";
    });
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <LoginContainer>
        <InputContainer>
          <Form>
            <Title>{authMode === "login" ? "로그인" : "회원가입"}</Title>
            <IdContainer>
              <label>ID : &nbsp;</label>
              <Input
                type="text"
                name="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="4~10글자"
                autoFocus
                maxLength={10}
                minLength={4}
              ></Input>
            </IdContainer>
            <PasswordContainer>
              <label>PASSWORD : &nbsp;</label>
              <Input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="4~15글자"
                maxLength={15}
                min={4}
              ></Input>
            </PasswordContainer>
            {authMode === "signup" && (
              <NicknameContainer>
                <label>NICKNAME : &nbsp;</label>
                <Input
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={handleNickname}
                  placeholder="1~10글자"
                  maxLength={10}
                  minLength={1}
                  required
                ></Input>
              </NicknameContainer>
            )}
            <ErrorTextContainer></ErrorTextContainer>
            {isLoggedIn ? (
              <p>User is logged in</p>
            ) : (
              <p>User is not logged in</p>
            )}
          </Form>
          <ButtonContainer>
            <FunctionButton onClick={handleLogin}>
              {authMode === "login" ? "로그인" : "회원가입"}
            </FunctionButton>
            <SwitchButton onClick={toggleAuthMode}>
              {authMode === "login" ? "회원가입" : "로그인"}
            </SwitchButton>
          </ButtonContainer>
        </InputContainer>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const InputContainer = styled.div`
  width: 440px;
  height: auto;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  font-size: 16px;
`;

const IdContainer = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-weight: normal;
    color: #777;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #c7c7c7;
  height: 40px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-weight: normal;
    color: #777;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  width: 100%;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-weight: normal;
    color: #777;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const FunctionButton = styled.button`
  background-color: gainsboro;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  transform: scale(1.2);
`;

const SwitchButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const ErrorTextContainer = styled.div`
  width: max-content;
  height: auto;
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 0 10px;
`;

export default Auth;
