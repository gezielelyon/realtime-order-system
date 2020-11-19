import React from 'react';

import GlobalStyles from './styles/GlobalStyles';
import {Container, Content} from './styles/index';

import logo from './images/logo.svg';

import Orders from './Components/Orders/index';

function App() {
  return (
   <>
     <GlobalStyles />
     <Container>
       <Content>
         <img src={logo} alt="ezOrders"/>
         <Orders/>
       </Content>
     </Container>
   </>
  );
}

export default App;
