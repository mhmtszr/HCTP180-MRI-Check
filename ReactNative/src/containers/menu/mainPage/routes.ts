import {
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  CalendarIconOutlineOrange,
  CheckmarkIconOutlineOrange,
  ClockIconOutlineOrange,
  ClipboardIconOutlineOrange,
} from '@src/assets/icons';
import {
  ThemeKey,
  ThemeService,
} from '@src/core/themes';
import { MenuContainerData } from './type';

export const routes: MenuContainerData[] = [
  {
    title: 'Gün Sonu Bilgilendirme',
    icon: (style: StyleProp<ImageStyle>, theme: ThemeKey) => {
      return ThemeService.select({
        'Eva Light': CalendarIconOutlineOrange(style),
        'Eva Dark': CalendarIconOutlineOrange(style),
      }, theme);
    },
    route: 'Evaluation',
  },
  {
    title: 'Yemek Listesi',
    icon: (style: StyleProp<ImageStyle>, theme: ThemeKey) => {
      return ThemeService.select({
        'Eva Light': ClipboardIconOutlineOrange(style),
        'Eva Dark': ClipboardIconOutlineOrange(style),
      }, theme);
    },
    route: 'MealList',
  },
  {
    title: 'Ders Programı',
    icon: (style: StyleProp<ImageStyle>, theme: ThemeKey) => {
      return ThemeService.select({
        'Eva Light': ClockIconOutlineOrange(style),
        'Eva Dark': ClockIconOutlineOrange(style),
      }, theme);
    },
    route: 'Syllabus',
  },
  {
    title: 'Ödemeler',
    icon: (style: StyleProp<ImageStyle>, theme: ThemeKey) => {
      return ThemeService.select({
        'Eva Light': CheckmarkIconOutlineOrange(style),
        'Eva Dark': CheckmarkIconOutlineOrange(style),
      }, theme);
    },
    route: 'Payment',
  }
];
