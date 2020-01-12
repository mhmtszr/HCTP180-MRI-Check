import React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { MainPage } from './mainPage.component';
import { MenuContainerData } from './type';
import { routes } from './routes';

export class MainPageContainer extends React.Component<NavigationStackScreenProps> {

  private data: MenuContainerData[] = routes;
  private navigationKey: string = 'MenuContainer';

  private onItemSelect = (index: number) => {
    const { [index]: selectedItem } = this.data;

    if (selectedItem.route === "Payment") {
      Alert.alert(
        'Bilgi!',
        'Ödemeniz bulunmamaktadır!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    } else {
      this.props.navigation.navigate({
        key: this.navigationKey,
        routeName: selectedItem.route,
      });
    }

  };

  public render(): React.ReactNode {
    return (
      <MainPage
        data={this.data}
        onItemSelect={this.onItemSelect}
      />
    );
  }
}
