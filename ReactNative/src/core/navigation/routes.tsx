import React from 'react';
import { useScreens } from 'react-native-screens';
import {
  createAppContainer,
  NavigationContainer,
  NavigationRouteConfigMap,
} from 'react-navigation';
import {
  createStackNavigator, NavigationStackProp,
} from 'react-navigation-stack';
import {
  MenuContainer, MainPageContainer,
  AnalyzeContainer, SettingsContainer,
  ChangePasswordContainer,
} from '@src/containers/menu';

import {
  MenuNavigationOptions
} from './options';
import { MainAuthContainer } from '@src/containers/auth';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AnalyzeFormContainer } from '@src/containers/menu/analyze/analyzeForm/analyzeForm.container';


const MainPageNavigator: NavigationContainer = createStackNavigator(
  {
    ['MainPage']: MainPageContainer,
  },
  {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const AnalyzeNavigator: NavigationContainer = createStackNavigator(
  {
    ['Analyze']: AnalyzeContainer,
    ['AnalyzeForm']: AnalyzeFormContainer
  },
  {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const SettingsNavigator: NavigationContainer = createStackNavigator(
  {
    ['Settings']: SettingsContainer,
    ['ChangePassword']: ChangePasswordContainer
  },
  {
    defaultNavigationOptions: MenuNavigationOptions,
  },
);

const MenuNavigator = createBottomTabNavigator({
  ['MainPage']: MainPageNavigator,
  ['Analyze']: AnalyzeNavigator,
  ['Settings']: SettingsNavigator,
}, {
  tabBarComponent: MenuContainer,
});

const MenuMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ['Menu']: MenuNavigator
};

const AppNavigator: NavigationContainer = createStackNavigator({
  ['Auth']: MainAuthContainer,
  ...MenuMap,
},
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
  });

const createAppRouter = (container: NavigationContainer): NavigationContainer => {
  useScreens();
  return createAppContainer(container);
};


export const Router: NavigationContainer = createAppRouter(AppNavigator);
