import React from "react";
import { Layout } from "antd";
import Home from "./pages/home";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ color: "#fff" }}>Header</Header>
      <Content style={{ padding: "20px 20px" }}>
        <Home />
      </Content>
    </Layout>
  );
}

export default App;
