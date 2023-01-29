import React, { PropsWithChildren, useState } from "react";
import Modal from "../components/Modal";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../shared/firebase";
// React.Dispatch<React.SetStateAction<boolean>>
import AlertModal from "../components/modal/AlertModal";

function LoginForm({
  setIsNotLogin,
  setOpenModal,
}: {
  setIsNotLogin: any;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id } = useParams();
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [AlertMessageText, setAlertMessageText] = useState("");

  const alertTextTimer = (message: any) => {
    setAlertText(message);
    setTimeout(() => setAlertText(""), 3000);
  };
  // email, password 정규식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const signIn = (e: any) => {
    e.preventDefault();

    if (email.match(emailRegEx) === null) {
      //형식에 맞지 않을 경우 아래 alert 출력
      //return alert("올바른 이메일 형식이 아닙니다.");
      setAlertModal(true);
      setAlertMessageText("올바른 이메일 형식이 아닙니다.");
    }

    if (password.match(passwordRegEx) === null) {
      //형식에 맞지 않을 경우 아래 alert 출력
      //return alert("비밀번호를 확인해주세요. 영문자, 숫자 혼합 8~20자입니다.");
      setAlertModal(true);
      setAlertMessageText(
        "비밀번호를 확인해주세요. 영문자, 숫자 혼합 8~20자입니다."
      );
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log("로그인 성공 ! : ", userCredential);
        setAlertModal(true);
        setAlertMessageText("로그인 성공! 🎉");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log("errorMessage:", errorCode, errorMessage);
        if (errorMessage.includes("user-not-found")) {
          //alert("가입되지 않은 회원입니다.");
          setAlertModal(true);
          setAlertMessageText("가입되지 않은 회원입니다.");
          return;
        } else if (errorMessage.includes("wrong-password")) {
          //alert("비밀번호가 올바르지 않습니다.");
          setAlertModal(true);
          setAlertMessageText("비밀번호가 올바르지 않습니다.");
        } else {
          //alert("로그인 성공! 🎉");
          //return;
        }
      });
  };

  // input마다 onKeyDown 속성에 이 함수를 넣었습니다.
  // input에서 Enter를 누르면 signIn 함수가 실행됩니다.
  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      signIn(e);
    }
  };

  return (
    <Container>
      {alertModal ? (
        <AlertModal
          children={AlertMessageText}
          setAlertModal={setAlertModal}
          setOpenModal={setOpenModal}
        />
      ) : null}
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
                required
                onKeyDown={handleOnKeyPress}
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
                required
                onKeyDown={handleOnKeyPress}
              />
            </div>
            <SignUpBtn
              onClick={() => {
                setIsNotLogin(true);
              }}
            >
              회원가입
            </SignUpBtn>
            <LoginBtn onClick={signIn}>로그인</LoginBtn>
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
