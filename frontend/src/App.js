import AllBlog from "./views/AllBlog";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  max-width: 600px;
  width: 100%;
`;

function App() {
  return (
    <Container>
      <AllBlog />
    </Container>
  );
}

export default App;
