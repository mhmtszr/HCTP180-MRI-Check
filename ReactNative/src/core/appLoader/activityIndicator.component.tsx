import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export const IndicatorContext = React.createContext({
  showLoader: (animating, text) => { }
});

interface ActivityProps {
  animating: boolean,
  text: string,
}

export class ActivityIndicatorComponent extends React.Component<ActivityProps> {

  public render(): React.ReactNode {

    return (
      <Spinner
        // overlayColor={'#00000000'}
        animation={'fade'}
        visible={this.props.animating}
        textContent={this.props.text}
        textStyle={styles.spinnerTextStyle}
      />
    );

  };

}

const styles = StyleSheet.create({

  spinnerTextStyle: {
    color: '#FFF'
  },

})
