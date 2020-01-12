import React from 'react';
import {
  ListItem,
  ListItemProps,
  Text,
  Button,
} from '@kitten/ui';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { LayoutListItemData } from './type';
import { textStyle } from '../style';
import { View } from 'react-native';
import { RejectIconFill } from '@src/assets/icons';

interface ComponentProps {
  onRejectionPress: (data) => void;
  data: LayoutListItemData;
}

export type LayoutListItemProps = ThemedComponentProps & ComponentProps & ListItemProps;

class LayoutListItemComponent extends React.Component<LayoutListItemProps> {

  public render(): React.ReactNode {
    const { style, themedStyle, data, ...restProps } = this.props;

    return (
      <ListItem
        {...restProps}
        style={[themedStyle.container, style]}>
        <View style={{ flex: 1, flexDirection: "row" }}>

          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text
              style={textStyle.subtitle}
              category='s1'>
              {data.title}
            </Text>
            <Text
              style={textStyle.paragraph}
              appearance='hint'>
              {data.description}
            </Text>
          </View>
          <View style={themedStyle.buttonContainer}>
            <Button
              style={themedStyle.button}
              textStyle={textStyle.button}
              status='danger'
              size='medium'
              icon={RejectIconFill}
              onPress={this.props.onRejectionPress}>
              {}
            </Button>
          </View>
        </View>
      </ListItem>
    );
  }
}

export const LayoutListItem = withStyles(LayoutListItemComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  description: {
    marginTop: 4,
    ...textStyle.subtitle,
  },
  buttonContainer: {
    alignItems: 'flex-end'
  }
}));
