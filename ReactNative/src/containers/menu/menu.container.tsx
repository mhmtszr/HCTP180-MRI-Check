import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Menu } from './menu.component';
import SecureStorage from '@src/core/utils/secure.store'

export class MenuContainer extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'MenuContainer';

  constructor(props) {
    super(props);
  }

  private onTabSelect = (index: number) => {
    const { navigation } = this.props;
    const { [index]: selectedRoute } = navigation.state.routes;

    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: selectedRoute.routeName,
    });
  };

  public render(): React.ReactNode {
    return (
      <Menu
        selectedIndex={this.props.navigation.state.index}
        onTabSelect={this.onTabSelect}
      />
    );
  }
}
