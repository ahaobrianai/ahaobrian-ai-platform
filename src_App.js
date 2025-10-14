import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Dashboard from "./components/Dashboard";
import theme from "./styles/theme";
import "./styles/global.css";

// Rainbow animated background for the app
const AppContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #ff6b6b, #f7e94f, #4fd7fa, #8c6bfa, #53fa7b, #ff6b6b 100%);
  background-size: 200% 200%;
  animation: rainbowMove 8s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Dashboard />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;