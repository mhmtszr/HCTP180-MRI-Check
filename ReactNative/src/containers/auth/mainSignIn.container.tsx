import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { SignInFormData } from '@src/containers/auth';
import { SignIn } from './mainSignIn.component';
import axios from "axios"
import SecureStorage from '@src/core/utils/secure.store';
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
import * as Crypto from 'expo-crypto';

let loader;
export class MainAuthContainer extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'MainAuthContainer';

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    AsyncStorage.getItem('userInfo').then(result => {
      if (result) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({
            routeName: 'Menu'
          })]
        });
        navigation.dispatch(resetAction)
      }
    });
  }

  private onSignInPress = (data: SignInFormData, showLoader) => {
    const { navigation } = this.props;
    loader = showLoader;

    const username = data.username.trim();
    const pass = data.password.trim();
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, pass).then(hash => {

      var bodyFormData = new FormData();
      bodyFormData.append('phone', username);
      bodyFormData.append('pass', hash);

      loader(true, 'Giriş Yapılıyor...');
      axios({
        method: 'post',
        url: 'http://mricheck.calgan.engineer/login.php',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(function (response) {
        //handle success
        console.log(response.data);
        SecureStorage.storeData('loginInfo', JSON.stringify(response.data));
        let user = {
          id: response.data.id,
          name: response.data.first_name,
          surname: response.data.last_name,
          token: response.data.token,
          type: 'DOCTOR'
        }
        AsyncStorage.setItem('userInfo', JSON.stringify(user));
        let doctor = {
          name: response.data.first_name,
          surname: response.data.last_name,
          category: 'DOCTOR'
        }
        AsyncStorage.setItem('selectedDoctor', JSON.stringify(doctor));
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({
            routeName: 'Menu'
          })]
        });
        navigation.dispatch(resetAction)
        loader(false, '')
      })
        .catch(function (response) {
          //handle error
          console.log(response);
          let errorCode = response.code;
          let errorMessage = response.message;
          errorMessage = "Kullanıcı adı veya şifre hatalıdır! Bilgileriniz kontrol edip tekrar deneyiniz."
          if (errorCode === "auth/network-request-failed") {
            errorMessage = "Internet bağlantınızı kontrol ederek terar deneyiniz.";
          };
          Alert.alert('Hata!', errorMessage, [{ text: 'Tamam', onPress: () => loader(false, "") }]);
        });

    })

  };

  public render(): React.ReactNode {
    return (
      <SignIn
        onSignInPress={this.onSignInPress}
      />
    );
  }
}
