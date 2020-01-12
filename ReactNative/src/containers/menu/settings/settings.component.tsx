import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  AsyncStorage,
  View,
} from 'react-native';
import {
  ThemeType,
  withStyles,
  ThemedComponentProps,
} from '@kitten/theme';
import {
  Toggle,
  Text,
} from '@kitten/ui';
import {
  ContainerView,
  textStyle,
} from '@src/components/common';
import { IndicatorContext } from '@src/core/appLoader/activityIndicator.component'
import { About } from './about.component'

interface State {
  isAboutVisible: boolean;
  isSecretVisible: boolean;
}

interface ComponentProps {
  soundEnabled: boolean;
  onChangePasswordPress: () => void;
  onLogoutPress: (showLoader) => void;
}

export type SettingsProps = ThemedComponentProps & ComponentProps;

class SettingsComponent extends React.Component<SettingsProps> {

  public state: State = {
    isAboutVisible: false,
    isSecretVisible: false
  }

  constructor(props) {
    super(props);
    let thizz = this;
    AsyncStorage.getItem('userInfo').then(function (result) {
      var user = JSON.parse(result);
      if (user.type == 'ADMIN') {
        thizz.setState({ isSecretVisible: true });
      }
    });
  }

  private onChangePasswordPress = () => {
    this.props.onChangePasswordPress();
  };

  private onAboutPress = (isVisible) => {
    this.setState({ isAboutVisible: isVisible });
  };

  private onLogoutPress = (showLoader) => {
    this.props.onLogoutPress(showLoader);
  };

  public render(): React.ReactNode {
    const { themedStyle, soundEnabled } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        <Section
          style={themedStyle.section}
          onPress={this.onChangePasswordPress}>
          <Text
            style={themedStyle.sectionText}
            category='s2'>
            Şifre Değiştir
          </Text>
        </Section>
        <Section
          style={themedStyle.section}
          onPress={() => this.onAboutPress(!this.state.isAboutVisible)}>
          <Text
            style={themedStyle.sectionText}
            category='s2'>
            Hakkında
          </Text>
          <About
            isModalVisible={this.state.isAboutVisible}
            onClosePress={() => this.setState({ isAboutVisible: false })}>
          </About>
        </Section>
        <IndicatorContext.Consumer>
          {({ showLoader }) => (
            <Section
              style={themedStyle.section}
              onPress={() => this.onLogoutPress(showLoader)}>
              <Text
                style={[themedStyle.sectionText, themedStyle.logoutText]}
                category='s2'>
                Çıkış Yap
                </Text>
            </Section>
          )}
        </IndicatorContext.Consumer>
      </ContainerView>
    );
  }
}

interface SectionProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

const Section = (props?: SectionProps): React.ReactElement<TouchableOpacityProps> => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      {...props}
    />
  );
};

export const Settings = withStyles(SettingsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  notificationSection: {
    paddingTop: 40,
  },
  soundEnabledSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 40,
  },
  sectionText: textStyle.subtitle,
  logoutText: {
    color: 'red'
  }
}));
