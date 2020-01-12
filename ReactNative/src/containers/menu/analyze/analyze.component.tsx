import React from 'react';
import {
    View, ActivityIndicator,
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
import axios from "axios"
import { AsyncStorage } from 'react-native';

interface ComponentProps {
    onCreate: () => void;
    onItemSelect: (item: AnalyzeContainerData, data: AnalyzeContainerData[]) => void;
}

interface State {
    data: AnalyzeContainerData[];
    isDataLoaded: boolean;
}

export type AnalyzeProps = ThemedComponentProps & ComponentProps & State;

class AnaylzeComponent extends React.Component<AnalyzeProps> {

    public state: State = {
        data: [],
        isDataLoaded: false
    };

    componentWillMount() {
        console.log("Yükleme işlemleri")
        let thizz = this;
        AsyncStorage.getItem('userInfo').then(result => {
            if (result) {
                const user = JSON.parse(result);
                var bodyFormData = new FormData();
                bodyFormData.append('token', user.token);
                bodyFormData.append('userid', user.id);
                axios({
                    method: 'post',
                    url: 'http://mricheck.calgan.engineer/lastanalyzes.php',
                    data: bodyFormData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (response) {
                    //handle success
                    if (response.data) {
                        let constructedData: AnalyzeContainerData[] = [];
                        response.data.forEach(element => {
                            console.log(element)
                            let constructed: AnalyzeContainerData = {
                                title: 'Add New Card',
                                description: new Date(parseInt(element.time) * 1000).toDateString(),
                                image: null,
                                route: 'AnalyzeForm',
                                previouseNavigation: 'Analyze',
                                age: element.age,
                                sex: element.sex,
                                chestPainType: element.chest,
                                restingBloodPressure: element.rbp,
                                serumCholestrol: element.sc,
                                fastingBloodSugar: element.fbs,
                                restingECG: element.ecg,
                                maxHeartRate: element.mxhr,
                                exerciseInducedAngina: element.angina,
                                stDepression: element.depression,
                                peakExerciseSTSegment: element.peakexercise,
                                numberOfMajorVessel: element.floros,
                                thal: element.tales,
                            };
                            constructedData.push(constructed);
                        });
                        thizz.setState({ data: constructedData });
                        thizz.setState({ isDataLoaded: true });
                    }
                }).catch(function (response) {
                    //handle error
                    thizz.setState({ isDataLoaded: true })
                    console.log(response);
                });
            }
        });
    }

    private onItemPress = (index: number) => {
        const { [index]: selectedItem } = this.state.data;
        this.props.onItemSelect(selectedItem, this.state.data);
    };

    private onCreate = (): void => {
        this.props.onCreate();
    };

    public render(): React.ReactNode {
        const { themedStyle, data, ...restProps } = this.props;

        return (
            !this.state.isDataLoaded ?
                <View style={themedStyle.loading}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
                :
                <View style={themedStyle.content}>
                    <LayoutList
                        contentContainerStyle={themedStyle.listContainer}
                        data={this.state.data}
                        onItemPress={this.onItemPress}
                    />
                    <View style={themedStyle.buttonContainer}>
                        <Button
                            style={themedStyle.addButton}
                            textStyle={textStyle.button}
                            size='large'
                            onPress={this.onCreate}>
                            Yeni Analiz Ekle
                    </Button>
                    </View>
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
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButton: {},
}));
