import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 680px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;

  @media (max-width: 800px) {
    height: 500px;
    width: 340px;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 40px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 800px) {
    font-size: 20px;
    font-weight: 600;
  }
`;

// UserProfile
export const UserProfile = styled.div`
  width: ${(props) =>
    props.size === "m" ? "200px" : props.size === "l" && "300px"};
  height: ${(props) =>
    props.size === "m" ? "200px" : props.size === "l" && "300px"};
  border-radius: 50%;
  margin-top: ${(props) => props.mt ?? "130px"};
  margin-bottom: ${(props) =>
    props.size === "m" ? "20px" : props.size === "l" && "50px"};
  color: rgba(0, 0, 0, 0.8);
  background-color: #fff;

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) =>
      props.size === "m" ? "100px" : props.size === "l" && "150px"};
    width: ${(props) =>
      props.size === "m" ? "100px" : props.size === "l" && "150px"};
    font-size: 15px;
  }
`;

export const ProfileInput = styled.img`
  background-color: #fff;
  width: ${(props) => (props.size === "l" ? "300px" : "200")};
  height: ${(props) => (props.size === "l" ? "300px" : "200")};
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 100px;
    height: 100px;
  }
`;

export const Input = styled.input`
  width: 400px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 0px;

  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

// btn
export const MidnightBlueBtn = styled.button`
  background-color: rgba(25, 25, 112, 0.5);
  color: #ffffff;
  width: ${(props) =>
    props.size === "s" ? "100px" : props.size === "l" && "400px"};
  height: 50px;
  border-radius: 10px;
  margin-top: 20px;
  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

export const SlateBlue = styled.button`
  background-color: rgba(93, 111, 176, 0.5);
  color: #ffffff;
  width: ${(props) =>
    props.size === "s" ? "100px" : props.size === "l" && "400px"};
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  &:hover {
    background-color: rgb(93, 111, 176);
    transition: 0.5s;
  }

  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;
