import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ChangePassword, ChangePasswordFormData } from './changePassword.component';
import { AsyncStorage } from 'react-native';
import SecureStorage from '@src/core/utils/secure.store';
import axios from "axios"

interface State {
  formData: ChangePasswordFormData | undefined;
}

export class ChangePasswordContainer extends React.Component<NavigationStackScreenProps, State> {

  public state: State = {
    formData: undefined
  };


  private onFormDataChange = (formData: ChangePasswordFormData) => {
    this.setState({ formData });
  };

  private onChangePasswordButtonPress = (showLoader) => {

    let thizz = this;
    const { navigation } = this.props;

    showLoader(true, "Şifre Değiştiriliyor...")
    // user.reauthenticateWithCredential(credential).then(function () {
    //   user.updatePassword(thizz.state.formData.newPassword).then(function () {
    //     Alert.alert('Başarı!', 'Şifreniz başarıyla değiştirildi.', [{
    //       text: 'Tamam', onPress: () => { console.log('OK Pressed') }
    //     }]);
    //     showLoader(false, "")
    //     thizz.logout(showLoader);
    //   });
    // }).catch(function (error) {
    //   log({ 'message': 'Girilen şifre yanlıştır lütfen tekrar deneyiniz.' }, 'onChangePasswordButtonPress', false, showLoader);
    //   Alert.alert('Hata!', 'Girilen şifre yanlıştır lütfen tekrar deneyiniz.', [{
    //     text: 'Tamam', onPress: () => showLoader(false, "")
    //   }]);
    // });
  };

  /**
   * İki yerde logout var unutma
   * 1- ChangePassword
   * 2- Settings
   */
  private logout = (showLoader) => {
    const { navigation } = this.props;

    AsyncStorage.getItem('userInfo').then(result => {
      if (result) {
        const user = JSON.parse(result);
        var bodyFormData = new FormData();
        console.log(user.token)
        bodyFormData.append('token', user.token);

        showLoader(true, "Çıkış Yapılıyor...");
        axios({
          method: 'post',
          url: 'http://mricheck.calgan.engineer/logout.php',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function (response) {
          //handle success
          console.log(response.data);
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
          console.log(response);
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
              routeName: 'Auth'
            })]
          });
          navigation.dispatch(resetAction)
          showLoader(false, "");
        });
      }
    });

  };

  public render(): React.ReactNode {
    return (
      <ChangePassword
        onChangePasswordPress={this.onChangePasswordButtonPress}
        onDataChange={this.onFormDataChange} />
    );
  }
}
