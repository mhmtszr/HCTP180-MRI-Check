import React from 'react';
import {
    View, ActivityIndicator, Alert, ScrollView, RefreshControl,
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
    onCreate: (onSave) => void;
    onItemSelect: (item: AnalyzeContainerData, data: AnalyzeContainerData[], onSave) => void;
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

    componentDidMount() {
        this.fetchData(this);
    }

    private fetchData(thizz) {
        /**
         * Analizlerin yükleme işlemleri
         */
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
                            let constructed: AnalyzeContainerData = {
                                id: element.id,
                                title: element.age + ' Yaş ' + (element.sex == "0" ? "Kadın" : "Erkek"),
                                description: thizz.formatDate(new Date(parseInt(element.time) * 1000)),
                                image: null,
                                route: 'AnalyzeForm',
                                previouseNavigation: 'Analyze',
                                age: element.age,
                                sex: parseInt(element.sex),
                                chestPainType: parseInt(element.chest),
                                restingBloodPressure: element.rbp,
                                serumCholestrol: element.sc,
                                fastingBloodSugar: element.fbs,
                                restingECG: parseInt(element.ecg),
                                maxHeartRate: element.mxhr,
                                exerciseInducedAngina: parseInt(element.angina),
                                stDepression: element.depression,
                                peakExerciseSTSegment: parseInt(element.peakexercise),
                                numberOfMajorVessel: parseInt(element.floros),
                                thal: parseInt(element.tales),
                            };
                            constructedData.push(constructed);
                        });
                        thizz.setState({ data: constructedData });
                        thizz.setState({ isDataLoaded: true });
                    }
                }).catch(function (response) {
                    //handle error
                    thizz.setState({ isDataLoaded: true })
                    Alert.alert('Hata!', 'Bir sorun oluştu: ' + response, [{ text: 'Tamam', onPress: () => { } }]);
                });
            }
        });
    }

    /**
     * Tarihin istenilen formata çevrilmesi
     */
    private formatDate(date, saat = true) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes();

        min = min.toString();
        if (min.length == 1)
            min = "0" + min;

        var sec = date.getSeconds();

        var formatted = '';
        if (saat) {
            formatted = day + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec;
        } else {
            formatted = day + '.' + month + '.' + year;
        }
        return formatted
    }

    private onItemPress = (index: number) => {
        const { [index]: selectedItem } = this.state.data;
        this.props.onItemSelect(selectedItem, this.state.data, this.fetchData);
    };

    private onCreate = (): void => {
        this.props.onCreate(this.fetchData);
    };

    private onRejectionPress = (index: number): void => {

        /**
         * Analizin sonucu olumsuz ise doktorun geri bildirim 
         * sağlayarak ileriki analizler iyileştimek için yapılan
         * düzenleme
         */
        const { [index]: selectedItem } = this.state.data;
        let thizz = this;
        Alert.alert(
            'Uyarı!',
            'Bu analiz sonucunun yanlış olduğundan emin misini?',
            [
                { text: 'Hayır', onPress: () => { }, style: 'cancel', },
                { text: 'Evet', onPress: () => this.onYesPress(thizz, selectedItem) },
            ],
            { cancelable: true },
        );

    };

    private onYesPress(thizz, selectedItem) {
        AsyncStorage.getItem('userInfo').then(result => {
            if (result) {
                const user = JSON.parse(result);
                var bodyFormData = new FormData();
                bodyFormData.append('token', user.token);
                bodyFormData.append('userid', user.id);
                bodyFormData.append('analyzeid', selectedItem.id);
                axios({
                    method: 'post',
                    url: 'http://mricheck.calgan.engineer/feedback.php',
                    data: bodyFormData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (response) {
                    //handle success
                    if (response.data) {
                        Alert.alert('Başarı!', 'İşleminiz başarıyla gerçekleştirildi.', [{
                            text: 'Tamam', onPress: () => { }
                        }]);
                    }
                }).catch(function (response) {
                    //handle error
                    thizz.setState({ isDataLoaded: true })
                    Alert.alert('Hata!', 'Bir sorun oluştu: ' + response, [{
                        text: 'Tamam', onPress: () => { }
                    }]);
                });
            }
        });
    }


    // private wait(timeout) {
    //     return new Promise(resolve => {
    //         setTimeout(resolve, timeout);
    //     });
    // }

    private onRefresh(fetch, thizz) {
        fetch(thizz);
    };

    public render(): React.ReactNode {
        const { themedStyle, data, ...restProps } = this.props;
        const fetch = this.fetchData;
        let thizz = this;

        return (
            !this.state.isDataLoaded ?
                <View style={themedStyle.loading}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
                :
                <View style={themedStyle.content}>
                    <ScrollView refreshControl={<RefreshControl refreshing={!this.state.isDataLoaded} onRefresh={() => this.onRefresh(fetch, thizz)} />}>
                        {
                            <LayoutList
                                contentContainerStyle={themedStyle.listContainer}
                                data={this.state.data}
                                onItemPress={this.onItemPress}
                                onRejectionPress={this.onRejectionPress}
                            />
                        }
                    </ScrollView>
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
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
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
