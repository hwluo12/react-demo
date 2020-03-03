# react教程(一)

<a name="6de286da"></a>
## 一、初始化项目

<a name="2ad00d73"></a>
### 1.开发环境

1. 安装[node](http://nodejs.cn/download/)，验证安装成功`node -v; npm -v`;推荐安装yarn。
  1. 也可使用[cnpm](http://npm.taobao.org/)替换[npm](https://www.npmjs.com/)。 安装方法`npm install -g cnpm --registry=https://registry.npm.taobao.org`，验证安装成功`cnpm -v`
  2. 也可以用[yarn](https://yarn.bootcss.com/)替换npm。 安装方法`npm install -g yarn`，验证安装成功`yarn -v`
  3. 也可以用[tyarn](https://npm.taobao.org/package/tyarn)替换npm。 安装方法`npm install -g tyarn`，验证安装成功`tyarn -v`
2. 编辑器推荐[vscode](https://code.visualstudio.com/)
3. 安装[git](https://git-scm.com/) (使用git bash功能和代码管理功能)

<a name="fe4bd8e2"></a>
### 2.[创建工程](https://react.docschina.org/docs/create-a-new-react-app.html)

1. 使用[create-react-app](https://github.com/facebookincubator/create-react-app)脚手架创建项目`npx create-react-app react-demo`
2. 进入项目目录`cd react-demo`
3. 启动`yarn start`
4. 分析理解react目录结构，并删除src目录下的无用文件，只保留`App.js`,`index.js`,`serviceWorker.js`
5. 修改src/index.js代码如下：```
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
```

修改src/App.js代码如下所示```
// src/App.js
import React from "react";

function App() {
  return <div>hello world</div>;
}

export default App;
```

6. 下载chrome插件 (可下可不下，只是为了查看React Component)
  1. 方式一、[react 官方github下载安装](https://github.com/facebook/react-devtools/releases)
  2. 方式二、[chrome商店](https://chrome.google.com/webstore/category/extensions)搜索 React Developer Tools
7. 提交到git，推荐使用[sourcetree](https://www.sourcetreeapp.com/)查看git提交记录

<a name="0f5de68e"></a>
### 3. [React 是什么？](https://reactjs.bootcss.com/tutorial/tutorial.html)

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。

<a name="4ee6355c"></a>
## 二、使用state,props数据流实现[todolist](http://www.todolist.cn/)

<a name="e2d6af3d"></a>
### 1. 新建Home组件
新建`src/pages/home`目录，并新建文件`src/pages/home/index.js`代码如下

```
// src/pages/home/index.js
import React from "react";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoLists: [
        {
          id: 0,
          title: "react"
        },
        {
          id: 1,
          title: "vue"
        },
        {
          id: 2,
          title: "angular"
        }
      ]
    };
    this.counter = 100;
  }

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState(prevState => ({
      inputValue
    }));
  };

  handleSubmit = () => {
    const inputValue = this.state.inputValue;
    if (!inputValue.trim()) {
      return;
    }
    const item = {
      title: inputValue,
      id: ++this.counter
    };
    this.setState(prevState => {
      let newTodoLists = [...prevState.todoLists, item];
      return {
        todoLists: newTodoLists,
        inputValue: ""
      };
    });
  };

  handleItemClick = id => {
    this.setState(prevState => {
      return {
        todoLists: prevState.todoLists.filter(item => item.id !== id)
      };
    });
  };

  render() {
    const { inputValue, todoLists } = this.state;
    return (
      <div>
        <div>
          <input value={inputValue} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>提交</button>
        </div>
        <ul>
          {todoLists.map(item => (
            <li key={item.id} onClick={() => this.handleItemClick(item.id)}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
```
在`App.js`中引用`Home`组件

```
import React from "react";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
```

<a name="32d0e957"></a>
### 2. 优化代码-抽离组件

1. 新建 `src/pages/home/components`目录，新建`src/pages/home/components/Item.js`实现`Item`组件

```
// src/pages/home/components/Item.js
import React from "react";

export default ({ id, title, handleItemClick }) => {
  return <li onClick={() => handleItemClick(id)}>{title}</li>;
};
```

2. 新建`src/pages/home/components/InputItem.js`实现`InputItem`组件

```
// src/pages/home/components/InputItem.js
import React from "react";

export default ({ inputValue, handleSubmit, handleChange }) => {
  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>提交</button>
    </div>
  );
};
```

3. 使用`Item`和`InputItem`组件

```
// src/page/index.js
import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoLists: [
        {
          id: 0,
          title: "react"
        },
        {
          id: 1,
          title: "vue"
        },
        {
          id: 2,
          title: "angular"
        }
      ]
    };
    this.counter = 100;
  }

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState(prevState => ({
      inputValue
    }));
  };

  handleSubmit = () => {
    const inputValue = this.state.inputValue;
    if (!inputValue.trim()) {
      return;
    }
    const item = {
      title: inputValue,
      id: ++this.counter
    };
    this.setState(prevState => {
      let newTodoLists = [...prevState.todoLists, item];
      return {
        todoLists: newTodoLists,
        inputValue: ""
      };
    });
  };

  handleItemClick = id => {
    this.setState(prevState => {
      return {
        todoLists: prevState.todoLists.filter(item => item.id !== id)
      };
    });
  };

  render() {
    const { inputValue, todoLists } = this.state;
    return (
      <div>
        <InputItem
          inputValue={inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={e => this.handleChange(e)}
        />
        <ul>
          {todoLists.map(item => (
            <Item
              key={item.id}
              {...item}
              handleItemClick={this.handleItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
```

4. 提交到git

<a name="7e9aec9d"></a>
### 3. 模拟请求

1. fetch请求：修改`src/page/home/index.js`页面，数据改用fetch获取，修改后代码`index.js`如下

```
// src/page/home/index.js
import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoLists: []
    };
    this.counter = 100;
  }

  componentDidMount() {
    fetch("/api/lists.json")
      .then(response => response.json())
      .then(res =>
        this.setState(() => ({
          todoLists: res.data
        }))
      )
      .catch(e => console.log("获取数据失败"));
  }

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState(prevState => ({
      inputValue
    }));
  };

  handleSubmit = () => {
    const inputValue = this.state.inputValue;
    if (!inputValue.trim()) {
      return;
    }
    const item = {
      title: inputValue,
      id: ++this.counter
    };
    this.setState(prevState => {
      let newTodoLists = [...prevState.todoLists, item];
      return {
        todoLists: newTodoLists,
        inputValue: ""
      };
    });
  };

  handleItemClick = id => {
    this.setState(prevState => {
      return {
        todoLists: prevState.todoLists.filter(item => item.id !== id)
      };
    });
  };

  render() {
    const { inputValue, todoLists } = this.state;
    return (
      <div>
        <InputItem
          inputValue={inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={e => this.handleChange(e)}
        />
        <ul>
          {todoLists.map(item => (
            <Item
              key={item.id}
              {...item}
              handleItemClick={this.handleItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
```

2. 模拟数据

在`public`目录下新建`/public/api/lists.json`文件

```
// /public/api/lists.json
{
  "success": true,
  "data": [
    {
      "id": 0,
      "title": "react"
    },
    {
      "id": 1,
      "title": "vue"
    },
    {
      "id": 2,
      "title": "angular"
    }
  ]
}
```

3. 提交git

<a name="d81343b8"></a>
### 4. 使用ant-design组件库重新实现上述功能

1. 安装[ant-design](https://ant.design/docs/react/introduce-cn) `yarn add antd`
2. 引入样式

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
```

3. 使用ant-design组件改造`InputItem` `Item`

```
// src/pages/home/components/InputItem.js
import React from "react";
import { Input, Button } from "antd";

export default ({ inputValue, handleSubmit, handleChange }) => {
  return (
    <div>
      <Input
        style={{
          width: 300
        }}
        value={inputValue}
        onChange={handleChange}
        placeholder="请输入新增list"
      />
      <Button onClick={handleSubmit} type="primary">
        提交
      </Button>
    </div>
  );
};
```

```
// src/pages/home/components/Item.js
import React from "react";
import { Card } from "antd";

export default ({ id, title, handleItemClick }) => {
  return <Card onClick={() => handleItemClick(id)}>{title}</Card>;
};
```

(至此todolist功能已经完成，下一小节的_理解react生命周期_只是对react核心概念的一个补充)

<a name="be7ba143"></a>
### 5. 理解react生命周期函数

1. [生命周期图示](https://reactjs.bootcss.com/docs/state-and-lifecycle.html)
<br />1. 15-16生命周期图示

![react.png](https://cdn.nlark.com/yuque/0/2020/png/448638/1581903412025-4c311427-069a-4f0a-82cf-8e39a68bac83.png#align=left&display=inline&height=732&name=react.png&originHeight=732&originWidth=1265&size=115320&status=done&style=none&width=1265)<br />    2. 16.3生命周期图示<br />![react-lifecycle-methods-diagram_16.3.png](https://cdn.nlark.com/yuque/0/2020/png/448638/1581903446881-a4bbbff8-0781-492f-a1e0-f8b1b97ad9fc.png#align=left&display=inline&height=1274&name=react-lifecycle-methods-diagram_16.3.png&originHeight=1274&originWidth=2374&size=168213&status=done&style=none&width=2374)<br />    3. ^16.4生命周期图示<br />![react-lifecycle-methods-diagram_ 16.4.png](https://cdn.nlark.com/yuque/0/2020/png/448638/1581903460304-f4d98a65-ce90-4831-adf0-0e6335263e52.png#align=left&display=inline&height=1274&name=react-lifecycle-methods-diagram_%2016.4.png&originHeight=1274&originWidth=2374&size=167014&status=done&style=none&width=2374)

2. 独立Demo示例<br />
修改`src/App.js`文件如下：

```
// src/App.js
import React from "react";
import Demo from "./Demo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChildren: true
    };
    console.log("father constructor");
  }
  UNSAFE_componentWillMount() {
    console.log("father UNSAFE_componentWillMount");
  }
  componentDidMount() {
    console.log("father componentDidMount");
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("father UNSAFE_componentWillReceiveProps");
  }
  shouldComponentUpdate() {
    console.log("father shouldComponentUpdate");
    return true;
  }
  UNSAFE_componentWillUpdate() {
    console.log("father UNSAFE_componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("father componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("father componentWillUnmount");
  }
  render() {
    console.log("father render");
    return (
      <div>
        <div style={{ width: 300, border: "1px solid black" }}>
          <p>father</p>
          <p>
            <button onClick={() => this.setState({ showChildren: true })}>
              显示children
            </button>
            <button onClick={() => this.setState({ showChildren: false })}>
              隐藏children
            </button>
            <button onClick={() => this.setState({})}>更新father state</button>
          </p>
        </div>
        {this.state.showChildren ? (
          <div style={{ width: 300, border: "1px solid black" }}>
            <p>children</p>
            <Demo></Demo>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
```

新增`src/Demo.js`文件如下：

```
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("children constructor");
  }
  UNSAFE_componentWillMount() {
    console.log("children UNSAFE_componentWillMount");
  }
  componentDidMount() {
    console.log("children componentDidMount");
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("children UNSAFE_componentWillReceiveProps");
  }
  shouldComponentUpdate() {
    console.log("children shouldComponentUpdate");
    return true;
  }
  UNSAFE_componentWillUpdate() {
    console.log("children UNSAFE_componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("children componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("children componentWillUnmount");
  }
  render() {
    console.log("children render");
    return (
      <div>
        <div>Demo</div>
        <div>
          <button onClick={() => this.setState({})}>自我更新state</button>
          <button onClick={() => this.forceUpdate()}>自我强制更新</button>
        </div>
      </div>
    );
  }
}

export default App;
```

3. 结合todolist展示生命周期函数<br />
将`src/pages/home/components/InputItem.js`修改为如下：

```
// src/pages/home/components/InputItem.js
import React from "react";
import { Input, Button } from "antd";

export default class InputItem extends React.Component {
  constructor(props) {
    super(props);
    console.log("InputItem constructor");
  }
  UNSAFE_componentWillMount() {
    console.log("InputItem UNSAFE_componentWillMount");
  }
  componentDidMount() {
    console.log("InputItem componentDidMount");
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("InputItem UNSAFE_componentWillReceiveProps");
  }
  shouldComponentUpdate() {
    console.log("InputItem shouldComponentUpdate");
    return true;
  }
  UNSAFE_componentWillUpdate() {
    console.log("InputItem UNSAFE_componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("InputItem componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("InputItem componentWillUnmount");
  }
  render() {
    console.log("InputItem render");
    const { inputValue, handleSubmit, handleChange } = this.props;
    return (
      <div>
        <Input
          style={{
            width: 300
          }}
          value={inputValue}
          onChange={handleChange}
          placeholder="请输入新增list"
        />
        <Button onClick={handleSubmit} type="primary">
          提交
        </Button>
      </div>
    );
  }
}

// export default ({ inputValue, handleSubmit, handleChange }) => {
//   return (
//     <div>
//       <Input
//         style={{
//           width: 300
//         }}
//         value={inputValue}
//         onChange={handleChange}
//         placeholder="请输入新增list"
//       />
//       <Button onClick={handleSubmit} type="primary">
//         提交
//       </Button>
//     </div>
//   );
// };
```

将`src/pages/home/components/Item.js`修改为如下：

```
// src/pages/home/components/Item.js
import React from "react";
import { Card } from "antd";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    console.log("Item constructor");
  }
  UNSAFE_componentWillMount() {
    console.log("Item UNSAFE_componentWillMount");
  }
  componentDidMount() {
    console.log("Item componentDidMount");
  }
  UNSAFE_componentWillReceiveProps() {
    console.log("Item UNSAFE_componentWillReceiveProps");
  }
  shouldComponentUpdate() {
    console.log("Item shouldComponentUpdate");
    return true;
  }
  UNSAFE_componentWillUpdate() {
    console.log("Item UNSAFE_componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("Item componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("Item componentWillUnmount");
  }
  render() {
    console.log("Item render");
    const { id, title, handleItemClick } = this.props;
    return <Card onClick={() => handleItemClick(id)}>{title}</Card>;
  }
}

// export default ({ id, title, handleItemClick }) => {
//   return <Card onClick={() => handleItemClick(id)}>{title}</Card>;
// };
```

将`src/pages/home/index.js`修改为如下：

```
// src/pages/home/index.js
import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoLists: []
    };
    this.counter = 100;
    console.log("Father constructor");
  }
  UNSAFE_componentWillMount() {
    console.log("Father UNSAFE_componentWillMount");
  }

  UNSAFE_componentWillReceiveProps() {
    console.log("Father UNSAFE_componentWillReceiveProps");
  }
  shouldComponentUpdate() {
    console.log("Father shouldComponentUpdate");
    return true;
  }
  UNSAFE_componentWillUpdate() {
    console.log("Father UNSAFE_componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("Father componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("Father componentWillUnmount");
  }

  componentDidMount() {
    console.log("Father componentDidMount");
    fetch("/api/lists.json")
      .then(response => response.json())
      .then(res => {
        console.log("Father fetch");
        this.setState(() => ({
          todoLists: res.data
        }));
      })
      .catch(e => console.log("获取数据失败"));
  }

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState(prevState => ({
      inputValue
    }));
  };

  handleSubmit = () => {
    const inputValue = this.state.inputValue;
    if (!inputValue.trim()) {
      return;
    }
    const item = {
      title: inputValue,
      id: ++this.counter
    };
    this.setState(prevState => {
      let newTodoLists = [...prevState.todoLists, item];
      return {
        todoLists: newTodoLists,
        inputValue: ""
      };
    });
  };

  handleItemClick = id => {
    this.setState(prevState => {
      return {
        todoLists: prevState.todoLists.filter(item => item.id !== id)
      };
    });
  };

  render() {
    console.log("Father render");
    const { inputValue, todoLists } = this.state;
    const styles = {
      paddingLeft: 0,
      width: 300,
      marginTop: 10
    };
    return (
      <div>
        <InputItem
          inputValue={inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={e => this.handleChange(e)}
        />
        <ul style={styles}>
          {todoLists.map(item => (
            <Item
              key={item.id}
              {...item}
              handleItemClick={this.handleItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
```
<a name="dmZqa"></a>
## 三、引入[React Router](https://reacttraining.com/react-router/web/guides/quick-start)

<a name="1CmOJ"></a>
### 1. 使用antd的[Layout组件](https://ant.design/components/layout-cn/)布局

```
// /src/App.js
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
```

<a name="tCxWm"></a>
### 2. 引入[React-Router](https://reacttraining.com/react-router/web)
  1. 安装 `yarn add react-router-dom`

2. 引用
```
// src/App.js
import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header style={{ color: "#fff" }}>Header</Header>
        <Content style={{ padding: "20px 20px" }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
```

3. 新增detail页面
  1. 添加`/src/pages/detail/index.js`文件，代码如下：
```
// /src/pages/detail/index.js
import React from "react";
import { useParams } from "react-router-dom";
export default props => {
  const params = useParams();
  console.log(params);
  return <div>detail - {params.id}</div>;
};
```
b. 添加路由跳转，修改`/src/App.js`和`/src/pages/home/components/Item.js`分别如下：
```
// /src/App.js
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
```
```
// /src/pages/home/components/Item.js
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";

export default ({ id, title, handleItemClick }) => {
  return (
    <Card>
      <span
        style={{ float: "left", width: "80%" }}
        onClick={() => handleItemClick(id)}
      >
        {title}
      </span>
      <span>
        <Link to={`/detail/${id}`}>More</Link>
      </span>
    </Card>
  );
};
```
(全文结束)

---

<a name="tsZj1"></a>
## 四、附录：
<a name="Tm5M9"></a>
### 1.最终代码：

1. 在线查看：[github在线代码v1.0.0](https://github.com/hwluo12/react-demo/tree/v1.0.0)
1. zip查看：[react-demo.zip](https://www.yuque.com/attachments/yuque/0/2020/zip/448638/1582615395915-7039ccba-a4da-4a86-80a5-ea0d5841b75b.zip?_lake_card=%7B%22uid%22%3A%221582615395626-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2020%2Fzip%2F448638%2F1582615395915-7039ccba-a4da-4a86-80a5-ea0d5841b75b.zip%22%2C%22name%22%3A%22react-demo.zip%22%2C%22size%22%3A919319%2C%22type%22%3A%22application%2Fzip%22%2C%22ext%22%3A%22zip%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22XOwJ1%22%2C%22card%22%3A%22file%22%7D)
<a name="ci8Gx"></a>
### 2.学习参考资料：

1. [React 中文文档](https://reactjs.bootcss.com/)
2. [B站-react教学视频](https://search.bilibili.com/all?keyword=react&from_source=nav_search_new)
3. [阮一峰博客-react技术栈](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)
4. [React.js 小书](http://huziketang.mangojuice.top/books/react/)
4. [React 官方推荐资源](https://react.docschina.org/community/courses.html)
4. [React-Router官网](https://reacttraining.com/react-router/web/guides/quick-start)

# react教程(二)



<a name="b04f10ba"></a>
### 一、 [Redux](http://cn.redux.js.org/)+[React-Redux](https://react-redux.js.org/introduction/quick-start)

随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state （状态）。 这些state可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

<a name="6757bb36"></a>
#### 1. 引入&使用Redux

1. redux安装`yarn add redux`
2. 创建**store**：在`src/store`目录下新建`src/store/index.js`文件，代码如下：

```
// src/store/index.js
import { createStore } from "redux";
import reducer from "./reducer";

let store = createStore(
  reducer
);

export default store;
```

3. 创建**reducer**：创建`src/store/reducer.js`文件，代码如下

```
// src/store/reducer.js
const defaultState = {
  inputValue: "",
  todoLists: []
};

export default (state = defaultState, action) => {
    return state;
}
```

4. 下载安装[redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)插件，并修改·`src/store/index.js`引入插件

```
// src/store/index.js
import { createStore } from "redux";
import reducer from "./reducer";

let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
```

5. 安装[React-Redux](https://react-redux.js.org/introduction/quick-start)(支持^react16.8.3) `yarn add react-redux`
6. `/src/index.js`引入React-Redux

```
// /src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

7. View实现

```
// /src/pages/home/index.js
import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";
import { connect } from "react-redux";

class Home extends React.PureComponent {
  componentDidMount() {
    fetch("/api/lists.json")
      .then(response => response.json())
      .then(res => this.props.getInitData(res.data))
      .catch(e => console.log("获取数据失败"));
  }

  handleChange = e => {
    this.props.handleChange(e.target.value);
  };

  handleSubmit = () => {
    this.props.handleSubmit();
  };

  handleItemClick = id => {
    this.props.handleItemClick(id);
  };

  render() {
    const { inputValue, todoLists } = this.props;
    const styles = {
      paddingLeft: 0,
      width: 300,
      marginTop: 10
    };
    return (
      <div>
        <InputItem
          inputValue={inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={e => this.handleChange(e)}
        />
        <ul style={styles}>
          {todoLists.map(item => (
            <Item
              key={item.id}
              {...item}
              handleItemClick={this.handleItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputValue: state.inputValue,
    todoLists: state.todoLists
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange(inputValue) {
    dispatch({
      type: "CHANGE_INPUT_VALUE",
      payload: inputValue
    });
  },
  handleSubmit() {
    dispatch({
      type: "ADD_TODOLIST"
    });
  },
  handleItemClick(id) {
    dispatch({
      type: "DELETE_TODOLIST",
      payload: id
    });
  },
  getInitData(data) {
    dispatch({
      type: "INIT_TODOLISTS",
      payload: data
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

```
// src/store/reducer.js
const defaultState = {
  inputValue: "",
  todoLists: [
    {
      id: 0,
      title: "react"
    },
    {
      id: 1,
      title: "vue"
    },
    {
      id: 2,
      title: "angular"
    }
  ],
  count: 100
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_INPUT_VALUE":
      return {
        ...state,
        inputValue: action.payload
      };
    case "ADD_TODOLIST":
      const newTodoList = {
        id: state.count,
        title: state.inputValue
      };
      return {
        inputValue: "",
        todoLists: state.todoLists.concat(newTodoList),
        count: ++state.count
      };
    case "DELETE_TODOLIST":
      const newTodoLists = state.todoLists.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        todoLists: newTodoLists
      };
    case "INIT_TODOLISTS":
      return {
        ...state,
        todoLists: action.payload
      };
    default:
      return state;
  }
};
```

<a name="aa68bc41"></a>
#### 2. 优化代码

actionCreators拆分

```
// src/store/actionCreators.js
import * as CONSTANTS from "./constants";

export const handleChangeAction = inputValue => ({
  type: CONSTANTS.CHANGE_INPUT_VALUE,
  payload: inputValue
});

export const handleSubmitAction = () => ({
  type: CONSTANTS.ADD_TODOLIST
});

export const handleItemClickAction = id => ({
  type: CONSTANTS.DELETE_TODOLIST,
  payload: id
});

export const getInitDataAction = data => ({
  type: CONSTANTS.INIT_TODOLISTS,
  payload: data
});
```

actionType拆分

```
// src/store/constants.js
export const CHANGE_INPUT_VALUE = "CHANGE_INPUT_VALUE";
export const ADD_TODOLIST = "ADD_TODOLIST";
export const DELETE_TODOLIST = "DELETE_TODOLIST";
export const INIT_TODOLISTS = "INIT_TODOLISTS";
```

reducer修改

```
src\store\reducer.js
import * as CONSTANTS from "./constants";

const defaultState = {
  inputValue: "",
  todoLists: [
    {
      id: 0,
      title: "react"
    },
    {
      id: 1,
      title: "vue"
    },
    {
      id: 2,
      title: "angular"
    }
  ],
  count: 100
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CONSTANTS.CHANGE_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload
      };
    case CONSTANTS.ADD_TODOLIST:
      const newTodoList = {
        id: state.count,
        title: state.inputValue
      };
      return {
        inputValue: "",
        todoLists: state.todoLists.concat(newTodoList),
        count: ++state.count
      };
    case CONSTANTS.DELETE_TODOLIST:
      const newTodoLists = state.todoLists.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        todoLists: newTodoLists
      };
    case CONSTANTS.INIT_TODOLISTS:
      return {
        ...state,
        todoLists: action.payload
      };
    default:
      return state;
  }
};
```

index.js修改

```
// src/pages/home/index.js
import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";
import { connect } from "react-redux";
import * as ActionCreators from "../../store/actionCreators";

class Home extends React.PureComponent {
  componentDidMount() {
    fetch("/api/lists.json")
      .then(response => response.json())
      .then(res => this.props.getInitData(res.data))
      .catch(e => console.log("获取数据失败"));
  }

  handleChange = e => {
    this.props.handleChange(e.target.value);
  };

  handleSubmit = () => {
    this.props.handleSubmit();
  };

  handleItemClick = id => {
    this.props.handleItemClick(id);
  };

  render() {
    const { inputValue, todoLists } = this.props;
    const styles = {
      paddingLeft: 0,
      width: 300,
      marginTop: 10
    };
    return (
      <div>
        <InputItem
          inputValue={inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={e => this.handleChange(e)}
        />
        <ul style={styles}>
          {todoLists.map(item => (
            <Item
              key={item.id}
              {...item}
              handleItemClick={this.handleItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputValue: state.inputValue,
    todoLists: state.todoLists
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange(inputValue) {
    dispatch(ActionCreators.handleChangeAction(inputValue));
  },
  handleSubmit() {
    dispatch(ActionCreators.handleSubmitAction());
  },
  handleItemClick(id) {
    dispatch(ActionCreators.handleItemClickAction(id));
  },
  getInitData(data) {
    dispatch(ActionCreators.getInitDataAction(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

<a name="3e4b5d9a"></a>
### 二、使用[Redux-thunk](https://github.com/reduxjs/redux-thunk)重构

<a name="7cafe569"></a>
#### 1. 引入&使用

1. 安装 `yarn add redux-thunk`
2. 引入

```
// /src/store/index.js
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

let store = createStore(reducer, enhancer);

export default store;
```

3. 使用<br />
修改`src/store/actionCreators.js`如下：

```
// /src/store/actionCreators.js
import * as CONSTANTS from "./constants";

export const handleChangeAction = inputValue => ({
  type: CONSTANTS.CHANGE_INPUT_VALUE,
  payload: inputValue
});

export const handleSubmitAction = () => ({
  type: CONSTANTS.ADD_TODOLIST
});

export const handleItemClickAction = id => ({
  type: CONSTANTS.DELETE_TODOLIST,
  payload: id
});

export const getInitDataAction = data => ({
  type: CONSTANTS.INIT_TODOLISTS,
  payload: data
});

export const fetchData = () => {
  return dispatch => {
    fetch("/api/lists.json")
      .then(response => response.json())
      .then(res => {
        console.log(res);
        dispatch(getInitDataAction(res.data));
      })
      .catch(e => console.log("获取数据失败"));
  };
};
```

修改`/src/pages/home/index.js`如下：

```
// /src/pages/home/index.js
import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";
import { connect } from "react-redux";
import * as ActionCreators from "../../store/actionCreators";

class Home extends React.PureComponent {
  componentDidMount() {
    this.props.fetchData();
  }

  handleChange = e => {
    this.props.handleChange(e.target.value);
  };

  handleSubmit = () => {
    this.props.handleSubmit();
  };

  handleItemClick = id => {
    this.props.handleItemClick(id);
  };

  render() {
    const { inputValue, todoLists } = this.props;
    const styles = {
      paddingLeft: 0,
      width: 300,
      marginTop: 10
    };
    return (
      <div>
        <InputItem
          inputValue={inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={e => this.handleChange(e)}
        />
        <ul style={styles}>
          {todoLists.map(item => (
            <Item
              key={item.id}
              {...item}
              handleItemClick={this.handleItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputValue: state.inputValue,
    todoLists: state.todoLists
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange(inputValue) {
    dispatch(ActionCreators.handleChangeAction(inputValue));
  },
  handleSubmit() {
    dispatch(ActionCreators.handleSubmitAction());
  },
  handleItemClick(id) {
    dispatch(ActionCreators.handleItemClickAction(id));
  },
  getInitData(data) {
    dispatch(ActionCreators.getInitDataAction(data));
  },
  fetchData() {
    dispatch(ActionCreators.fetchData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

<a name="719016d7"></a>
#### 2. 中间件介绍

1. 中间件图示<br />
![](https://zos.alipayobjects.com/rmsportal/cyzvnIrRhJGOiLliwhcZ.png#align=left&display=inline&height=760&originHeight=760&originWidth=900&status=done&style=none&width=900)

<a name="3e80ea60"></a>
### 三、使用[Redux-saga](https://redux-saga-in-chinese.js.org/)重构

<a name="7cafe569-1"></a>
#### 1. 引入&使用

1. 安装 `yarn add redux-saga`
2. 引入

```
// /src/store/index.js
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

let store = createStore(reducer, enhancer);

sagaMiddleware.run(mySaga);

export default store;
```

3. 使用：<br />
创建`src/store/sagas.js`代码如下

```
// src/store/sagas.js
import { getInitDataAction } from "./actionCreators";
import { put, takeEvery } from "redux-saga/effects";

function* fetchUser(action) {
  try {
    const res = yield fetch("/api/lists.json").then(response =>
      response.json()
    );
    yield put(getInitDataAction(res.data));
  } catch (e) {
    console.log("请求失败", e);
  }
}

function* mySaga() {
  yield takeEvery("FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```

修改`/src/pages/home/index.js`如下：

```
// /src/pages/home/index.js
import React from "react";
import Item from "./components/Item";
import InputItem from "./components/InputItem";
import { connect } from "react-redux";
import * as ActionCreators from "../../store/actionCreators";

class Home extends React.PureComponent {
  componentDidMount() {
    this.props.getInitData();
  }

  handleChange = e => {
    this.props.handleChange(e.target.value);
  };

  handleSubmit = () => {
    this.props.handleSubmit();
  };

  handleItemClick = id => {
    this.props.handleItemClick(id);
  };

  render() {
    const { inputValue, todoLists } = this.props;
    const styles = {
      paddingLeft: 0,
      width: 300,
      marginTop: 10
    };
    return (
      <div>
        <InputItem
          inputValue={inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={e => this.handleChange(e)}
        />
        <ul style={styles}>
          {todoLists.map(item => (
            <Item
              key={item.id}
              {...item}
              handleItemClick={this.handleItemClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputValue: state.inputValue,
    todoLists: state.todoLists
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange(inputValue) {
    dispatch(ActionCreators.handleChangeAction(inputValue));
  },
  handleSubmit() {
    dispatch(ActionCreators.handleSubmitAction());
  },
  handleItemClick(id) {
    dispatch(ActionCreators.handleItemClickAction(id));
  },
  getInitData(data) {
    dispatch({
      type: "FETCH_REQUESTED"
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

<a name="2b3e18d4"></a>
### 四、附录

<a name="97af50c5"></a>
#### 1. 代码

1. 在线查看：[Redux+React-Redux最终代码](https://github.com/hwluo12/react-demo/commits/redux) [使用Redux-thunk重构最终代码](https://github.com/hwluo12/react-demo/commits/redux-thunk) [使用Redux-saga重构最终代码](https://github.com/hwluo12/react-demo/commits/redux-saga)
2. zip查看：[react-demo.zip](https://www.yuque.com/attachments/yuque/0/2020/zip/448638/1582682547439-41c8a685-5ca9-4efd-82cc-e00b7f611858.zip?_lake_card=%7B%22uid%22%3A%221582682546009-0%22%2C%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2020%2Fzip%2F448638%2F1582682547439-41c8a685-5ca9-4efd-82cc-e00b7f611858.zip%22%2C%22name%22%3A%22react-demo.zip%22%2C%22size%22%3A1580604%2C%22type%22%3A%22application%2Fzip%22%2C%22ext%22%3A%22zip%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22status%22%3A%22done%22%2C%22percent%22%3A0%2C%22id%22%3A%22Qutkc%22%2C%22card%22%3A%22file%22%7D)【注：使用git管理代码，其中master分支为教程一最终代码， redux分支为React+React-Redux最终代码，redux-thunk分支为使用Redux-thunk重构后的最终代码， redux-saga为使用Redux-saga重构后的最终代码】

<a name="8ae51112"></a>
#### 2. 学习资源

1. Redux,React-Reudx,Redux-thunk,Redux-saga官网
2. [技术胖Redux免费视频教程（共24集）](https://jspang.com/detailed?id=48)

