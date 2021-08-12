import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { Root } from 'native-base';
import Container from './Container';
import { MenuProvider } from 'react-native-popup-menu';

export const store = configureStore();

const App = () => (
  <Provider store={store}>
    <MenuProvider>
    <Root>
      <Container />
    </Root>
    </MenuProvider>
  </Provider>
);

export default App;
