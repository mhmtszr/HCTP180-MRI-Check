import React from 'react';
import {
  ListRenderItemInfo,
  Dimensions,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  List,
  ListProps,
} from '@kitten/ui';
import {
  MenuListItem,
  MenuListItemProps,
} from './menuListItem.component';
import { MenuListItemData } from './type';

const { width } = Dimensions.get('window');
const itemWidth: number = width / 2 - 32;

// @ts-ignore (override `renderItem` prop)
interface ComponentProps extends ListProps {
  data: MenuListItemData[];
  onItemPress: (index: number) => void;
  renderItem?: (info: ListRenderItemInfo<MenuListItemData>) => React.ReactElement<any>;
}

export type MenuListProps = ThemedComponentProps & ComponentProps;

type ListItemElement = React.ReactElement<MenuListProps>;
type ListItemElementInfo = ListRenderItemInfo<MenuListItemData>;

class MenuListComponent extends React.Component<MenuListProps> {

  private onItemPress = (index: number) => {
    this.props.onItemPress(index);
  };

  private renderItem = (info: ListItemElementInfo): ListItemElement => {
    return (
      <MenuListItem
        style={this.props.themedStyle.item}
        activeOpacity={0.75}
        data={info.item}
        onPress={this.onItemPress}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, ...restProps } = this.props;

    return (
      <List
        numColumns={2}
        columnWrapperStyle={themedStyle.columnWrapperStyle}
        renderItem={this.renderItem}
        {...restProps}
      />
    );
  }
}

export const MenuList = withStyles(MenuListComponent, (theme: ThemeType) => ({
  item: {
    flex: 1,
    height: 160,
    maxWidth: itemWidth,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
}));
