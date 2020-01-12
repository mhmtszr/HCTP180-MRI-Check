import React from 'react';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { MenuListItemData } from './type';
import { Slider } from './slider/slider.component';
import { slideHeight } from './slider/constants';
import { View } from 'react-native';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Showcase } from '@src/components/common/showcase';

interface ComponentProps {
  data: MenuListItemData[];
  onItemSelect: (index: number) => void;
}

type Props = ThemedComponentProps & ComponentProps;

const chartData = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

class MainPageComponent extends React.Component<Props> {

  private onItemPress = (index: number) => {
    this.props.onItemSelect(index);
  };

  public render(): React.ReactNode {
    const { themedStyle, data } = this.props;

    return (
      <View style={themedStyle.item}>
        <View style={themedStyle.sliderContainer}>
          <Slider>

          </Slider>
        </View>
        <Showcase>
          <View style={themedStyle.menuContainer}>
            <AreaChart
              style={{ height: 200 }}
              data={chartData}
              contentInset={{ top: 30, bottom: 30 }}
              curve={shape.curveNatural}
              svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
              <Grid />
            </AreaChart>
          </View>
        </Showcase>
      </View>

    );
  }
}

export const MainPage = withStyles(MainPageComponent, (theme: ThemeType) => ({
  sliderContainer: {
    flex: 1,
    maxHeight: slideHeight + 50
  },
  menuContainer: {
    flex: 1,
    margin: 10,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  item: {
    flex: 1,
  },
}));
