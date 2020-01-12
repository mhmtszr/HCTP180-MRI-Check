import Constants from 'expo-constants';
import * as firebase from 'firebase';
import { Alert, AsyncStorage } from 'react-native';

export interface NavigationRouteState {
  index: number;
  routes: any[];
  routeName?: string;

  params: { [key: string]: any };
}

export const getCurrentStateName = (state: NavigationRouteState): string => {
  return findCurrentRoute(state).routeName;
};

export const getCurrentRouteState = (navigation: any): NavigationRouteState => {
  return findCurrentRoute(navigation.state);
};

export const getCurrentRouteIndex = (navigation: any): number => {
  return navigation.state.index;
};

const findCurrentRoute = (state: NavigationRouteState): NavigationRouteState => {
  if (state.routes && state.routes.length !== 0) {
    return findCurrentRoute(state.routes[state.index]);
  }

  return state;
};

export const isRootRoute = (index: number): boolean => {
  return index !== 0;
};

export const log = (message, functionName: string, success: boolean, loader) => {
  let currentUser = firebase.auth().currentUser;
  // let user = currentUser ? {
  //   'createdAt': currentUser['createdAt'],
  //   'displayName': currentUser['displayName'],
  //   'email': currentUser['email'],
  //   'lastLoginAt': currentUser['lastLoginAt'],
  // } : { 'userName': 'Anonymous' };
  // console.log(user)
  AsyncStorage.getItem('triedUsername').then(result => {

    let annoymous = result ? JSON.parse(result) : 'Anonymous'

    let log = {
      'time': new Date,
      'functionName': functionName,
      'message': message,
      'success': success,
      'deviceId': Constants.deviceId,
      'deviceName': Constants.deviceName,
      'deviceYearClass': Constants.deviceYearClass,
      'nativeAppVersion': Constants.nativeAppVersion,
      'nativeBuildVersion': Constants.nativeBuildVersion,
      'platform': Constants.platform,
      'user': currentUser ? currentUser['email'] : annoymous
    }

    firebase.firestore().collection('log').doc().set(log).then(function () {

    }).catch(function (err) {
      Alert.alert('Hata!', 'Log yazarken hata! ' + err, [{
        text: 'Tamam', onPress: () => loader ? console.log('OK Pressed in Log') : loader(false, "")
      }]);
    });

  });

}
