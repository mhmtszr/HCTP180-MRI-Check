import React from 'react';
import {
  Radio,
  RadioProps,
} from '@kitten/ui';

interface CheckBoxShowcaseComponentState {
  checked: boolean;
  text: string;
}

class RadioShowcaseComponent extends React.Component<RadioProps, CheckBoxShowcaseComponentState> {

  static defaultProps: RadioProps = {
    checked: true,
    text: '',
  };

  public state: CheckBoxShowcaseComponentState = {
    checked: this.props.checked,
    text: this.props.text,
  };

  private onChange = (checked: boolean) => {
    this.setState({ checked });
  };

  public render(): React.ReactElement<RadioProps> {
    return (
      <Radio
        {...this.props}
        checked={this.state.checked}
        onChange={this.onChange}
        onPressOut={this.props.onPressOut}
      />
    );
  }
}

export const TextRadio = (props?: RadioProps): React.ReactElement<RadioProps> => {
  return (
    <RadioShowcaseComponent
      text={props.text}
      {...props}
    />
  );
};
