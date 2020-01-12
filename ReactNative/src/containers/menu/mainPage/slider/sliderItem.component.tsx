import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { colors, itemWidth, entryBorderRadius, itemHorizontalMargin, slideHeight, IS_IOS } from './constants';

interface ComponentProps {
    data: any,
    even: boolean,
    parallax?: boolean,
    parallaxProps?: object
}

class SliderItemComponent extends React.Component<ThemedComponentProps & ComponentProps> {

    get image() {
        const { themedStyle, data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
                source={{ uri: illustration }}
                containerStyle={[themedStyle.imageContainer, even ? themedStyle.imageContainerEven : {}]}
                style={themedStyle.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
                <Image
                    source={{ uri: illustration }}
                    style={themedStyle.image}
                />
            );
    }

    render() {
        const { themedStyle, data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text style={[themedStyle.title, even ? themedStyle.titleEven : {}]}
                numberOfLines={2}>
                {title}
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={themedStyle.slideInnerContainer}
                onPress={() => { Alert.alert(`${title}`); }}>
                <View style={themedStyle.shadow} />
                <View style={[themedStyle.imageContainer, even ? themedStyle.imageContainerEven : {}]}>
                    {this.image}
                    <View style={[themedStyle.radiusMask, even ? themedStyle.radiusMaskEven : {}]} />
                </View>
                <View style={[themedStyle.textContainer, even ? themedStyle.textContainerEven : {}]}>
                    {uppercaseTitle}
                    <Text
                        style={[themedStyle.subtitle, even ? themedStyle.subtitleEven : {}]}>
                        {subtitle}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}


export const SliderItem = withStyles(SliderItemComponent, (theme: ThemeType) => ({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 12 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 12,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
}));