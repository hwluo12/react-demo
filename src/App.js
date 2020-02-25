import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{ color: "#fff" }}>
          <Link to="/">Header</Link>
        </Header>
        <Content style={{ padding: "20px 20px" }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/detail/:id">
              <Detail />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
