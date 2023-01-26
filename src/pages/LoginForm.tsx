import React, { PropsWithChildren, useState } from "react";
import Modal from "../components/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../shared/firebase";
// React.Dispatch<React.SetStateAction<boolean>>

function LoginForm({
  setIsNotLogin,
  setOpenModal,
}: {
  setIsNotLogin: any;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("email : ", email);
  console.log("PW : ", password);

  const signIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log("로그인 성공 ! : ", userCredential);
        setOpenModal(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <Container>
      <form onSubmit={signIn}>
        <div className="form-inner">
          <CloseButton onClick={() => setOpenModal(false)}>x</CloseButton>
          <TitleText>로그인</TitleText>
          {/* Error! */}
          <LoginFormContainer>
            <div>
              <EmailInput
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <PwInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <SignUpBtn
              onClick={() => {
                setIsNotLogin(true);
              }}
            >
              회원가입
            </SignUpBtn>
            <LoginBtn>로그인</LoginBtn>
          </LoginFormContainer>
        </div>
      </form>
    </Container>
  );
}
export default LoginForm;
const Container = styled.div`
  margin-top: 18px;
`;

const CloseButton = styled.button`
  width: 18px;
  height: 18px;
  margin-left: 310px;
  margin-bottom: 20px;
  border-radius: 100px;
  border: none;
  background-color: black;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    box-shadow: 2px 4px 3px -3px black;
    transition: 0.3s;
  }
`;

const LoginFormContainer = styled.div`
  margin-left: 38px;
  margin-top: 30px;
`;

const TitleText = styled.h2`
  font-size: 20px;
  margin-left: 40px;
  margin-top: 10px;
`;

const EmailInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 86%;
  color: #7f7d7d;
  border: 1px solid #d0d0d0;
`;

const PwInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 86%;
  border: 1px solid #d0d0d0;
  color: #7f7d7d;
`;
const SignUpBtn = styled.button`
  border: none;
  width: 30%;
  margin-top: 18px;
  margin-left: 87px;
  margin-bottom: 5px;
  cursor: pointer;
  color: #a29f9f;
  &:hover {
    color: #262b7f;
    transition: 0.3s;
  }
`;

const LoginBtn = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px;
  width: 86%;
  margin: 20px;
  margin-left: 0px;
  margin-top: 10px;
  position: flex;
  align-items: center;
  background-color: #262b7f;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    border: 1px solid #262b7f;
    box-shadow: 1px 1px 1px 1px #262b7f;
    color: #262b7f;
    transition: 0.3s;
  }
`;
