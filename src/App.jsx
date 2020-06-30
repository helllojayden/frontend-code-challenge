import React from 'react';
// import { hot } from 'react-hot-loader/root';

import Layout from './components/Layout';
import Invite from './pages/Invite';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <>
        <Header>Broccoli & Co.</Header>
        <Content>
          <Invite />
        </Content>
        <Footer>
          <span>Made with ❤ in Melbourne.</span>
          <span>© 2016 Broccoli & Co. All rights reserved.</span>
        </Footer>
      </>
    );
  }
}

export default App;
