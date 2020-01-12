import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Alert,
} from 'react-native';
import {
  ThemeType,
  withStyles,
  ThemedComponentProps,
} from '@kitten/theme';
import {
  Toggle,
  Text,
  Input,
  Button,
} from '@kitten/ui';
import {
  NameValidator,
} from '@src/core/validators';
import {
  ContainerView,
  textStyle,
  ValidationInput,
} from '@src/components/common';
import { IndicatorContext } from '@src/core/appLoader/activityIndicator.component'

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

interface ComponentProps {
  onChangePasswordPress: (loader) => void;
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: ChangePasswordFormData | undefined) => void;
}

interface State {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
  isValid: boolean;
}

export type ChangePasswordProps = ThemedComponentProps & ComponentProps;

class ChangePasswordComponent extends React.Component<ChangePasswordProps> {

  public state: State = {
    oldPassword: undefined,
    newPassword: undefined,
    reNewPassword: undefined,
    isValid: false,
  }

  public componentDidUpdate(prevProps: ChangePasswordProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.setState({ isValid: true })
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.setState({ isValid: false })
      this.props.onDataChange(undefined);
      this.setState({ isValid: true })
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private isValid = (formData: ChangePasswordFormData): boolean => {
    const { oldPassword, newPassword, reNewPassword } = formData;

    return oldPassword !== undefined && newPassword !== undefined && reNewPassword !== undefined;
  };

  private onOldPasswordInputTextChange = (oldPassword: string) => {
    this.setState({ oldPassword });
  };

  private onNewPasswordInputTextChange = (newPassword: string) => {
    this.setState({ newPassword });
  };

  private onReNewPasswordInputTextChange = (reNewPassword: string) => {
    this.setState({ reNewPassword });
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ContainerView style={themedStyle.container}>
        <ValidationInput
          style={themedStyle.passwordInput}
          textStyle={textStyle.paragraph}
          placeholder='Eski Şifre'
          secureTextEntry={true}
          validator={NameValidator}
          onChangeText={this.onOldPasswordInputTextChange}
        />
        <ValidationInput
          style={themedStyle.passwordInput}
          textStyle={textStyle.paragraph}
          placeholder='Yeni Şifre'
          secureTextEntry={true}
          validator={NameValidator}
          onChangeText={this.onNewPasswordInputTextChange}
        />
        <ValidationInput
          style={themedStyle.passwordInput}
          textStyle={textStyle.paragraph}
          placeholder='Yeni Şifre Tekrar'
          secureTextEntry={true}
          validator={NameValidator}
          onChangeText={this.onReNewPasswordInputTextChange}
        />
        <IndicatorContext.Consumer>
          {({ showLoader }) => (
            <Button
              style={themedStyle.signInButton}
              textStyle={textStyle.button}
              size='giant'
              disabled={!this.state.isValid}
              onPress={() => this.props.onChangePasswordPress(showLoader)}>
              ŞİFRE DEĞİŞTİR
            </Button>
          )}
        </IndicatorContext.Consumer>
      </ContainerView>
    );
  }
}

export const ChangePassword = withStyles(ChangePasswordComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    padding: 16,
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
