import styled from "@emotion/styled";
import WhiteLogo from "../assets/Icon/WhiteLogo.svg";
import { useState } from "react";
import LoginAPI from "../api/LoginAPI";

export interface ILogin {
  userId: string;
  userPassword: string;
}

export const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onClickSubmit = () => {
    const adminInfo: ILogin = {
      userId: id,
      userPassword: pw,
    };
    console.log("input", adminInfo);
    const res = LoginAPI.postLogin(adminInfo);
    console.log({ res });
    localStorage.setItem("atk", JSON.stringify(res));
  };

  return (
    <Wrapper>
      <Container>
        <LogoWrapper>
          <Logo src={WhiteLogo} alt="로고" />
        </LogoWrapper>
        <IDInput
          type="text"
          placeholder="아이디를 입력하세요"
          defaultValue={id}
          onChange={(e) => setId(e.target.value)}
        />
        <PWInput
          type="text"
          placeholder="비밀번호를 입력하세요"
          defaultValue={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <SubmitBtn onClick={onClickSubmit}>로그인</SubmitBtn>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  width: 700px;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 400px;
  padding-top: 10px;
  border-radius: 10px;
  background-color: black;
`;

const Logo = styled.img`
  display: flex;
`;

const IDInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  margin-top: 50px;
`;

const PWInput = styled.input`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  margin-top: 20px;
`;

const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 70px;
  padding: 7px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #ff9136;
`;
