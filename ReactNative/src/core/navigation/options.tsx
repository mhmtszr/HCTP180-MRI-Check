import React from 'react';
import { Alert } from 'react-native';
import {
  NavigationParams,
} from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { MenuContainer } from '@src/containers/menu';
import { ArrowIosBackFill } from '@src/assets/icons';
import { TopNavigationBar } from './components/topNavigationBar.component';
import {
  getCurrentRouteState,
  isRootRoute,
  NavigationRouteState,
  getCurrentRouteIndex,
} from './util';
import { KEY_NAVIGATION_BACK } from './constants';

export type TopNavigationElement = React.ReactElement<any>;
export type BottomNavigationElement = React.ReactElement<any>;

export interface TopNavigationParams extends NavigationParams {
  header: (props: NavigationStackScreenProps) => TopNavigationElement | null;
}

export interface BottomNavigationParams extends NavigationParams {
  bottomNavigation: (props: NavigationStackScreenProps) => BottomNavigationElement | null;
}

const translate = {
  "MainPage": "MRI Check",
  "Analyze": "Analiz",
  'AnalyzeForm': 'Yeni Analiz',
  "Settings": "Ayarlar",
  "ChangePassword": "Şifre Değiştir",
};

function getTranslation(key) {
  return translate[key] ? translate[key] : key
}

const MenuTopNavigationParams: TopNavigationParams = {
  header: (props: NavigationStackScreenProps): TopNavigationElement => {
    // @ts-ignore (private API)
    const { routeName } = getCurrentRouteState(props.navigation);
    const index: number = getCurrentRouteIndex(props.navigation);

    return (
      <TopNavigationBar
        {...props}
        title={getTranslation(routeName)}
        backIcon={isRootRoute(index) && ArrowIosBackFill}
        onBackPress={() => {
          props.navigation.goBack(KEY_NAVIGATION_BACK);
        }}
      />
    );
  },
};


const MenuBottomNavigationParams: BottomNavigationParams = {
  bottomNavigation: (props: NavigationStackScreenProps): BottomNavigationElement => {
    return (
      <MenuContainer {...props} />
    );
  },
};

export const MenuNavigationOptions: NavigationParams = {
  ...MenuTopNavigationParams,
  ...MenuBottomNavigationParams,
};

export const EvaluationNavigationOptions: NavigationParams = MenuTopNavigationParams;

export const ArticlesNavigationOptions: NavigationParams = MenuTopNavigationParams;

export const DashboardNavigationOptions: NavigationParams = MenuTopNavigationParams;
