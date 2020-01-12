import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ChangePassword, ChangePasswordFormData } from './changePassword.component';
import firebase from 'firebase';
import { Alert, AsyncStorage } from 'react-native';
import SecureStorage from '@src/core/utils/secure.store';
import { log } from '@src/core/navigation/util';

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
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      thizz.state.formData.oldPassword
    );

    showLoader(true, "Şifre Değiştiriliyor...")
    user.reauthenticateWithCredential(credential).then(function () {
      user.updatePassword(thizz.state.formData.newPassword).then(function () {
        Alert.alert('Başarı!', 'Şifreniz başarıyla değiştirildi.', [{
          text: 'Tamam', onPress: () => { console.log('OK Pressed') }
        }]);
        showLoader(false, "")
        thizz.logout(showLoader);
      });
    }).catch(function (error) {
      log({ 'message': 'Girilen şifre yanlıştır lütfen tekrar deneyiniz.' }, 'onChangePasswordButtonPress', false, showLoader);
      Alert.alert('Hata!', 'Girilen şifre yanlıştır lütfen tekrar deneyiniz.', [{
        text: 'Tamam', onPress: () => showLoader(false, "")
      }]);
    });
  };

  /**
   * İki yerde logout var unutma
   * 1- ChangePassword
   * 2- Settings
   */
  private logout = (showLoader) => {
    const { navigation } = this.props;
    showLoader(true, "Çıkış Yapılıyor...");
    log({ 'message': 'Password change succesful' }, 'logout', true, showLoader);
    firebase.auth().signOut().then(function () {
      SecureStorage.deleteData("loginInfo");
      AsyncStorage.clear();
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'Auth'
        })]
      });
      showLoader(false, "")
      navigation.dispatch(resetAction)
    }).catch(function (error) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({
          routeName: 'Auth'
        })]
      });
      navigation.dispatch(resetAction)
      showLoader(false, "")
      log(error, 'logout', false, showLoader);
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
