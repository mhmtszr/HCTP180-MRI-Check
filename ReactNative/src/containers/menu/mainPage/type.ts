import React from 'react';
import { ImageProps } from 'react-native';
import { StyleType } from '@kitten/theme';
import { ThemeKey } from '@src/core/themes';

export interface MenuListItemData {
  title: string;
  icon: (style: StyleType, currentTheme: ThemeKey) => React.ReactElement<ImageProps>;
}

export interface MenuContainerData extends MenuListItemData {
  route: string;
}
