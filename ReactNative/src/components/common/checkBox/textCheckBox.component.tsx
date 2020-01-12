import React from 'react';
import {
  CheckBox,
  CheckBoxProps,
} from '@kitten/ui';

interface CheckBoxShowcaseComponentState {
  id: string;
  checked: boolean;
  text: string;
}

interface ComponentProps {
  id: string;
  onCheckBoxChange: (id: string, checked: boolean) => void;
}

type Props = ComponentProps & CheckBoxProps;

class CheckBoxShowcaseComponent extends React.Component<Props, CheckBoxShowcaseComponentState> {

  static defaultProps: CheckBoxProps = {
    checked: true,
    text: '',
  };

  public state: CheckBoxShowcaseComponentState = {
    id: this.props.id,
    checked: this.props.checked,
    text: this.props.text,
  };

  private onChange = (checked: boolean) => {
    this.props.onCheckBoxChange(this.props.id, checked)
    this.setState({ checked });
  };

  public render(): React.ReactElement<Props> {
    return (
      <CheckBox
        {...this.props}
        checked={this.state.checked}
        onChange={this.onChange}
      />
    );
  }
}

export const TextCheckBox = (props?: Props): React.ReactElement<Props> => {
  return (
    <CheckBoxShowcaseComponent
      id={props.id}
      text={props.text}
      {...props}
    />
  );
};
