import React from 'react';
import {
  Input,
  InputProps,
} from '@kitten/ui';

type InputElement = React.ReactElement<InputProps>;

class RadioShowcaseComponent extends React.Component<InputElement> {

}

export const DefaultInput = (props?: InputProps): InputElement => {
  return (
    <Input
      placeholder={props.placeholder}
      {...props}
    />
  );
};
