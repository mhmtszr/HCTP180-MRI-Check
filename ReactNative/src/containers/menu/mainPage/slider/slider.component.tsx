import React from 'react';
import { Platform, View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth, colors } from './constants';
import { SliderItem } from './sliderItem.component';
import { AsyncStorage, ActivityIndicator } from 'react-native';

import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { IndicatorContext } from '@src/core/appLoader/activityIndicator.component'
import { isLoaded } from 'expo-font';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;
const sliderBackground = [
    'https://hukuksokagi.com/wp-content/uploads/doktor.png'];

const categoryKey = {
    'ADMIN': 'Yönetici',
    'DOCTOR': 'Baş Hekim',
    'INSTRUCTOR': 'Öğretmen',
    '3YASA': '3 Yaş A Grubu',
    '3YASB': '3 Yaş B Grubu',
    '4YASA': '4 Yaş A Grubu',
    '4YASB': '4 Yaş B Grubu',
    '5YASA': '5 Yaş A Grubu',
}

let _carousel;
let sliderItems = [];

class SliderComponent extends React.Component<ThemedComponentProps> implements Carousel {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            isLoaded: false
        };

        var thizz = this;
        AsyncStorage.getItem('selectedDoctor').then(function (result) {
            if (result) {
                var doctor = JSON.parse(result);
                var sliderItem = [];
                var doc = {
                    title: doctor.name + " " + doctor.surname,
                    subtitle: categoryKey[doctor.category.trim()] ? categoryKey[doctor.category.trim()] : doctor.category,
                    illustration: sliderBackground[Math.floor(Math.random() * 4)]
                }
                sliderItem = sliderItem.concat(doc);
                sliderItems = sliderItem;
                thizz.setState({ isLoaded: true });
            }
        });
    }

    get loader() {
        return (
            <ActivityIndicator size={'small'} />
        );
    }

    get carousel() {
        const { themedStyle } = this.props;
        return (
            <SafeAreaView style={themedStyle.safeArea}>
                <View style={themedStyle.container}>
                    <ScrollView
                        style={themedStyle.scrollview}
                        scrollEventThrottle={200}
                        directionalLockEnabled={true}>
                        <View style={[themedStyle.exampleContainer, themedStyle.exampleContainerLight]}>
                            <IndicatorContext.Consumer>
                                {({ showLoader }) => (
                                    <Carousel
                                        ref={(c) => { _carousel = c; }}
                                        data={sliderItems}
                                        renderItem={this._renderItem}
                                        sliderWidth={sliderWidth}
                                        itemWidth={itemWidth}
                                        containerCustomStyle={themedStyle.slider}
                                        contentContainerCustomStyle={themedStyle.sliderContentContainer}
                                        layout={'default'}
                                        loop={false}
                                        onScrollEndDrag={() => this._onTouchEnd(showLoader)}
                                    />
                                )}
                            </IndicatorContext.Consumer>

                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    _renderItem({ item, index }) {
        return <SliderItem data={item} even={(index + 1) % 2 === 0} />;
    }

    _onTouchEnd(showLoader) {
        if (sliderItems.length > 1) {
            showLoader(true, "Ayarlar yükleniyor...")
            setTimeout(() => {
                AsyncStorage.getItem('userInfo').then(function (result) {
                    if (result) {
                        var doctor = JSON.parse(result);
                        AsyncStorage.setItem('selectedDoctor', JSON.stringify(doctor[_carousel.realIndex]));
                    }
                });
                showLoader(false, "")
            }, 500)
        }
    }

    render() {
        return !isLoaded ? this.loader : this.carousel;
    }
}

export const Slider = withStyles(SliderComponent, (theme: ThemeType) => ({
    safeArea: {
        flex: 1,
        // backgroundColor: colors.black
    },
    container: {
        flex: 1,
        // backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 15
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: theme['background-basic-color-2'],
        // backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 10,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 5 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
}));