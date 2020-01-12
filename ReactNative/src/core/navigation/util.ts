import Constants from 'expo-constants';
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

  // AsyncStorage.getItem('triedUsername').then(result => {

  //   let annoymous = result ? JSON.parse(result) : 'Anonymous'

  //   let log = {
  //     'time': new Date,
  //     'functionName': functionName,
  //     'message': message,
  //     'success': success,
  //     'deviceId': Constants.deviceId,
  //     'deviceName': Constants.deviceName,
  //     'deviceYearClass': Constants.deviceYearClass,
  //     'nativeAppVersion': Constants.nativeAppVersion,
  //     'nativeBuildVersion': Constants.nativeBuildVersion,
  //     'platform': Constants.platform,
  //     'user': currentUser ? currentUser['email'] : annoymous
  //   }

  // });

}
