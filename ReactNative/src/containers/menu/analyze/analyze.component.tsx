import React from 'react';
import {
    View,
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from '@kitten/theme';
import { LayoutList } from '@src/components/common/layoutList';
import { AnalyzeContainerData } from './type';
import { textStyle } from '@src/components/common';
import { Button } from 'react-native-ui-kitten/ui';

interface ComponentProps {
    data: AnalyzeContainerData[];
    onCreate: () => void;
    onItemSelect: (item: AnalyzeContainerData, data: AnalyzeContainerData[]) => void;
}

export type AnalyzeProps = ThemedComponentProps & ComponentProps;

class AnaylzeComponent extends React.Component<AnalyzeProps> {

    componentDidMount() {

    }

    private onItemPress = (index: number) => {
        const { [index]: selectedItem } = this.props.data;
        this.props.onItemSelect(selectedItem, this.props.data);
    };

    private onCreate = (): void => {
        this.props.onCreate();
        console.log("sdfsdfsdf")
    };

    public render(): React.ReactNode {
        const { themedStyle, data, ...restProps } = this.props;

        return (
            <View style={themedStyle.content}>
                <LayoutList
                    contentContainerStyle={themedStyle.listContainer}
                    data={data}
                    onItemPress={this.onItemPress}
                />
                <View style={themedStyle.buttonContainer}>
                    <Button
                        style={themedStyle.buyButton}
                        textStyle={textStyle.button}
                        size='large'
                        onPress={this.onCreate}>
                        Yeni Analiz Ekle
                    </Button>
                </View>
                {/* <IndicatorContext.Consumer key={12312313}>
                    {({ showLoader }) => (
                        
                    )}
                </IndicatorContext.Consumer> */}
            </View>
        );
    }

}

export const Analyze = withStyles(AnaylzeComponent, (theme: ThemeType) => ({
    content: {
        flex: 1,
    },
    listContainer: {
        justifyContent: 'flex-start',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        marginTop: 5,
        padding: 7,
        backgroundColor: theme['background-basic-color-1'],
    },
    buyButton: {},
}));
