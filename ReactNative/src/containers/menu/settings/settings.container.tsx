import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Settings } from './settings.component';
import { navigateAction } from '@src/core/navigation';
import SecureStorage from '@src/core/utils/secure.store';
import axios from "axios"
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
        { text: 'Hayır', onPress: () => { }, style: 'cancel', },
        { text: 'Evet', onPress: () => this.logout(showLoader) },
      ],
      { cancelable: true },
    );
  };

  private logout = (showLoader) => {
    const { navigation } = this.props;

    AsyncStorage.getItem('userInfo').then(result => {
      if (result) {
        const user = JSON.parse(result);
        var bodyFormData = new FormData();
        bodyFormData.append('token', user.token);

        showLoader(true, "Çıkış Yapılıyor...");
        axios({
          method: 'post',
          url: 'http://mricheck.calgan.engineer/logout.php',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function (response) {
          //handle success
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
        }).catch(function (response) {
          //handle error
          SecureStorage.deleteData("loginInfo");
          SecureStorage.deleteData("userInfo");
          AsyncStorage.clear();
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
              routeName: 'Auth'
            })]
          });
          navigation.dispatch(resetAction);
          Alert.alert('Hata!', 'Bir sorun oluştu: ' + response, [{ text: 'Tamam', onPress: () => showLoader(false, "") }]);
          showLoader(false, "");
        });
      }
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
