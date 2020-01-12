import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Settings } from './settings.component';
import { navigateAction, log } from '@src/core/navigation';
import SecureStorage from '@src/core/utils/secure.store';
import * as firebase from 'firebase';
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';

export class SettingsContainer extends React.Component<NavigationStackScreenProps> {

  private onChangePasswordPress = () => {
    this.props.navigation.dispatch(navigateAction('ChangePassword'));
  };

  private onLogoutPress = (showLoader) => {
    Alert.alert(
      'Uyarı!',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'Hayır', onPress: () => console.log('Cancel Pressed'), style: 'cancel', },
        { text: 'Evet', onPress: () => this.logout(showLoader) },
      ],
      { cancelable: true },
    );
  };

  private logout = (showLoader) => {
    const { navigation } = this.props;
    showLoader(true, "Çıkış Yapılıyor...");
    log({ 'message': 'Logout Successful' }, 'logout', true, showLoader);
    firebase.auth().signOut().then(function () {
      SecureStorage.deleteData("loginInfo");
      SecureStorage.deleteData("userInfo");
      AsyncStorage.clear();
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'Auth'
        })]
      });
      showLoader(false, "");
      navigation.dispatch(resetAction)
    }).catch(function (error) {
      console.log(error)
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'Auth'
        })]
      });
      navigation.dispatch(resetAction)
      showLoader(false, "");
    });
  };

  public render(): React.ReactNode {
    return (
      <Settings
        onChangePasswordPress={this.onChangePasswordPress}
        onLogoutPress={this.onLogoutPress}
      />
    );
  }
}
