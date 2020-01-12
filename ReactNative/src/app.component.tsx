import React from 'react';
import { ImageRequireSource } from 'react-native';
import { NavigationState } from 'react-navigation';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider } from '@kitten/theme';
import { DynamicStatusBar } from '@src/components/common';
import {
  ApplicationLoader,
  Assets,
} from './core/appLoader/applicationLoader.component';
import { Router } from './core/navigation/routes';
import { trackScreenTransition } from './core/utils/analytics';
import { getCurrentStateName } from './core/navigation/util';
import {
  ThemeContext,
  ThemeContextType,
  ThemeKey,
  themes,
  ThemeStore,
} from '@src/core/themes';
import { ActivityIndicatorComponent, IndicatorContext } from '@src/core/appLoader/activityIndicator.component';
import * as timerWorkaround from '@src/core/utils/timer.workaround';

const images: ImageRequireSource[] = [
  require('./assets/images/source/splash.png'),
];

const fonts: { [key: string]: number } = {
  'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
  'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
  'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
  'opensans-light': require('./assets/fonts/opensans-light.ttf'),
  'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
};

const assets: Assets = {
  images: images,
  fonts: fonts,
};

interface State {
  theme: ThemeKey;
  animating: boolean;
  text: string;
  showLoader: (animating, text) => any;
}

export default class App extends React.Component<{}, State> {

  showLoader = (animating, text) => {
    this.setState({ animating });
    this.setState({ text });
  };

  public state: State = {
    theme: 'Eva Light',
    animating: false,
    text: '',
    showLoader: this.showLoader,
  };


  private onTransitionTrackError = (error: any): void => {
    console.warn('Analytics error: ', error.message);
  };

  private onNavigationStateChange = (prevState: NavigationState, currentState: NavigationState) => {
    const prevStateName: string = getCurrentStateName(prevState);
    const currentStateName: string = getCurrentStateName(currentState);

    if (prevStateName !== currentStateName) {
      trackScreenTransition(currentStateName)
        .catch(this.onTransitionTrackError);
    }
  };

  private onSwitchTheme = (theme: ThemeKey) => {
    ThemeStore.setTheme(theme).then(() => {
      this.setState({ theme });
    });
  };

  public render(): React.ReactNode {

    /**
     * Firebase "Setting a timer for a long period of time, i.e. multiple minutes" hatası için;
     */
    timerWorkaround;

    const contextValue: ThemeContextType = {
      currentTheme: this.state.theme,
      toggleTheme: this.onSwitchTheme,
    };

    return (
      <ApplicationLoader assets={assets}>
        <ThemeContext.Provider value={contextValue}>
          <ApplicationProvider
            mapping={mapping}
            theme={themes[this.state.theme]}>

            <IndicatorContext.Provider value={this.state}>

              <ActivityIndicatorComponent animating={this.state.animating} text={this.state.text} />
              <DynamicStatusBar currentTheme={this.state.theme} />
              <Router onNavigationStateChange={this.onNavigationStateChange} />

            </IndicatorContext.Provider>

          </ApplicationProvider>
        </ThemeContext.Provider>
      </ApplicationLoader>
    );
  }
}
