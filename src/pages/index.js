import styled from "styled-components";

const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const Home = () => {
  return (
    <HomeWrapper>
      <h1>Home</h1>
    </HomeWrapper>
  );
};

export default Home;
