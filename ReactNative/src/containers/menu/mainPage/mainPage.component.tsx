import React from 'react';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Text } from 'react-native-ui-kitten/ui';
import { MenuListItemData } from './type';
import { Slider } from './slider/slider.component';
import { slideHeight } from './slider/constants';
import { View } from 'react-native';
import { BarChart, XAxis, Grid, PieChart } from 'react-native-svg-charts'
import { Showcase } from '@src/components/common/showcase';

interface ComponentProps {
  data: MenuListItemData[];
  onItemSelect: (index: number) => void;
}

type Props = ThemedComponentProps & ComponentProps;

const pieChart = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
const pieData = pieChart
  .filter((value) => value > 0)
  .map((value, index) => ({
    value,
    svg: {
      fill: randomColor(),
      onPress: () => console.log('press', index),
    },
    key: `pie-${index}`,
  }))

const xAxisData = [50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 24, 50, 20, 80]

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
          <Text style={themedStyle.labelText}>Yaşlara göre hasta dağılımı</Text>
          <View style={themedStyle.menuContainer}>
            <PieChart style={{ height: 200 }} data={pieData} />
          </View>

          <Text style={themedStyle.labelText}>Günlere göre istek sayıları</Text>
          <View style={[{ height: 200, padding: 20 }, themedStyle.menuContainer]}>
            <BarChart
              style={{ flex: 1 }}
              data={xAxisData}
              gridMin={0}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
            >
              <Grid />
            </BarChart>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={xAxisData}
              formatLabel={(value, index) => index}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
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
  labelText: {
    marginTop: 15,
    color: '#8F9BB3'
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  item: {
    flex: 1,
  },
}));
