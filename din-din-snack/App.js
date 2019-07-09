import * as React from 'react';
import { I18nextProvider, translate } from 'react-i18next';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';

import RootStack from './navigator';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() { // <AppContainer persistenceKey={"NavigationState"}/>
    return <AppContainer />;
  }
}
