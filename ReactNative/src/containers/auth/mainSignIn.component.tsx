import React from 'react';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  Text,
} from '@kitten/ui';
import {
  SignInForm,
  SignInFormData,
} from './mainSignInForm';
import {
  ScrollableAvoidKeyboard,
  textStyle,
} from '@src/components/common';
import { View, Image } from 'react-native';
import { IndicatorContext } from '@src/core/appLoader/activityIndicator.component';


interface ComponentProps {
  onSignInPress: (formData: SignInFormData, showLoader) => void;
}

export type SignInProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: SignInFormData | undefined;
}

class SignInComponent extends React.Component<SignInProps> {

  public state: State = {
    formData: undefined
  };

  private onSignInButtonPress = (showLoader) => {
    this.props.onSignInPress(this.state.formData, showLoader);
  };

  private onForgotPasswordButtonPress = () => {
  };

  private onFormDataChange = (formData: SignInFormData) => {
    this.setState({ formData });
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard style={themedStyle.container}>
        <View style={themedStyle.headerContainer}>
          <Image source={require('@src/assets/images/source/image-login-background-2.png')} 
                 style={themedStyle.loginBackground}>
          </Image>
        </View>
        <SignInForm
          style={themedStyle.formContainer}
          onForgotPasswordPress={this.onForgotPasswordButtonPress}
          onDataChange={this.onFormDataChange}
        />
        <IndicatorContext.Consumer>
          {({ showLoader }) => (
            <Button
              style={themedStyle.signInButton}
              textStyle={textStyle.button}
              size='giant'
              disabled={!this.state.formData}
              onPress={() => this.onSignInButtonPress(showLoader)}>
              GİRİŞ YAP
            </Button>
          )}
        </IndicatorContext.Consumer>
        <View style={themedStyle.signUpButton}></View>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const SignIn = withStyles(SignInComponent, (theme: ThemeType) => {
  return ({
    container: {
      flex: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 216,
    },
    loginBackground: {
      marginTop: 16,
      width: 200,
      height: 200,
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16,
    },
    helloLabel: {
      color: 'white',
      ...textStyle.headline,
    },
    signInLabel: {
      marginTop: 16,
      color: 'white',
      ...textStyle.subtitle,
    },
    signInButton: {
      marginHorizontal: 16,
      marginTop: 80,
    },
    signUpButton: {
      marginVertical: 12,
    },
    signUpText: {
      color: theme['text-hint-color'],
      ...textStyle.subtitle,
    },
  });
});

