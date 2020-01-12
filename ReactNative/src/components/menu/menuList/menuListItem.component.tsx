import React from 'react';
import { ImageProps } from 'react-native';
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  ListItem,
  ListItemProps,
  Text,
} from '@kitten/ui';
import { textStyle } from '@src/components/common';
import {
  ThemeContext,
  ThemeKey,
} from '@src/core/themes';
import { MenuListItemData } from './type';

interface ComponentProps {
  data: MenuListItemData;
}

export type MenuListItemProps = ThemedComponentProps & ListItemProps & ComponentProps;

class MenuListItemComponent extends React.Component<MenuListItemProps> {

  private renderShowcaseElement = (style: StyleType, theme: ThemeKey): React.ReactElement<ImageProps> => {
    const showcaseElement: React.ReactElement<ImageProps> = this.props.data.icon(style, theme);

    return React.cloneElement(showcaseElement, {
      style: [style, showcaseElement.props.style],
    });
  };

  public render(): React.ReactNode {
    const { style, themedStyle, data, ...restProps } = this.props;

    return (
      <ThemeContext.Consumer>{({ currentTheme }) => (
        <ListItem
          {...restProps}
          style={[themedStyle.container, style]}>
          {this.renderShowcaseElement(themedStyle.icon, currentTheme)}
          <Text
            style={[textStyle.subtitle, themedStyle.textStyle]}
            category='s2'>
            {data.title}
          </Text>
        </ListItem>
      )}</ThemeContext.Consumer>
    );
  }
}

export const MenuListItem = withStyles(MenuListItemComponent, (theme: ThemeType) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  textStyle: {
    textAlign: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
}));
