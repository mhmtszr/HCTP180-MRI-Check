import React from 'react';
import {
    View, AsyncStorage, 
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from '@kitten/theme';
import axios from "axios"
import { Button } from 'react-native-ui-kitten/ui';
import { AnalyzeContainerData } from '../type';
import { textStyle, ValidationInput } from '@src/components/common';
import { NumberValidator } from '@src/core/validators';
import RNPickerSelect from 'react-native-picker-select';
import { Showcase } from '@src/components/common/showcase';
import { IndicatorContext } from '@src/core/appLoader/activityIndicator.component';
import { Result } from './result.component';

interface ComponentProps {
    data: AnalyzeContainerData[];
    item: AnalyzeContainerData;
    onSave: () => void;
}

interface State {
    age: string;
    sex: number;
    chestPainType: number;
    restingBloodPressure: string;
    serumCholestrol: string;
    fastingBloodSugar: string;
    restingECG: number;
    maxHeartRate: string;
    exerciseInducedAngina: number;
    stDepression: string;
    peakExerciseSTSegment: number;
    numberOfMajorVessel: number;
    thal: number;
    isModalVisible: boolean;
    success: boolean;
}

export type AnalyzeProps = ThemedComponentProps & ComponentProps;

class AnaylzeFormComponent extends React.Component<AnalyzeProps> {

    public state: State = {
        age: '1',
        sex: 1,
        chestPainType: 1,
        restingBloodPressure: '1',
        serumCholestrol: '1',
        fastingBloodSugar: '1',
        restingECG: 1,
        maxHeartRate: '1',
        exerciseInducedAngina: 1,
        stDepression: '1',
        peakExerciseSTSegment: 1,
        numberOfMajorVessel: 1,
        thal: 3,
        isModalVisible: false,
        success: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.item != null ? this.setState(this.props.item) : false;
    }

    private onSave = (loader): void => {
        loader(true, 'Kaydediliyor...');

        let thizz = this;
        AsyncStorage.getItem('userInfo').then(result => {
            console.log(result)
            if (result) {
                const user = JSON.parse(result);
                var bodyFormData = new FormData();
                bodyFormData.append('token', user.token);
                bodyFormData.append('userid', user.id);
                bodyFormData.append('age', this.state.age);
                bodyFormData.append('sex', this.state.sex);
                bodyFormData.append('chest', this.state.chestPainType);
                bodyFormData.append('rbp', this.state.restingBloodPressure);
                bodyFormData.append('sc', this.state.serumCholestrol);
                bodyFormData.append('fbs', this.state.fastingBloodSugar);
                bodyFormData.append('ecg', this.state.restingECG);
                bodyFormData.append('mxhr', this.state.maxHeartRate);
                bodyFormData.append('angina', this.state.exerciseInducedAngina);
                bodyFormData.append('depression', this.state.stDepression);
                bodyFormData.append('peakexercise', this.state.peakExerciseSTSegment);
                bodyFormData.append('floros', this.state.numberOfMajorVessel);
                bodyFormData.append('tales', this.state.thal);
                axios({
                    method: 'post',
                    url: 'http://mricheck.calgan.engineer/sorgu.php',
                    data: bodyFormData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (response) {
                    //handle success
                    console.log(response.data);
                    loader(false, "");
                    const prediction = response.data.prediction;
                    thizz.setState({ success: prediction == "0" ? false : true });
                    thizz.setState({ isModalVisible: true });
                }).catch(function (response) {
                    //handle error
                    console.log(response);
                    loader(false, "");
                });
            } else {
                loader(false, "");
            }
        });

    };

    private onSelectionChange(state) {
        this.setState(state);
    }

    private onCloseModalPress(thizz) {
        thizz.setState({ isModalVisible: false })
        thizz.props.onSave();
    }

    public render(): React.ReactNode {
        const { themedStyle, data, ...restProps } = this.props;
        const disabled = this.props.item ? true : false;

        return (
            <Showcase>
                <View style={themedStyle.content}>
                    <View style={themedStyle.formContainer} >
                        <ValidationInput
                            disabled={disabled}
                            validator={NumberValidator}
                            placeholder={'Yaş'}
                            value={this.state.age}
                            onChangeText={(val) => this.setState({ age: val })}
                        />
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                placeholder={{ label: 'Cinsiyet...', value: null }}
                                disabled={disabled}
                                value={this.state.sex}
                                onValueChange={(value) => this.onSelectionChange({ sex: value })}
                                items={[{ value: 1, label: 'Erkek' }, { value: 0, label: 'Kadın' }]}
                            />
                        </View>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                placeholder={{ label: 'Ağrı türü...', value: null }}
                                disabled={disabled}
                                value={this.state.chestPainType}
                                onValueChange={(value) => this.setState({ chestPainType: value })}
                                items={[{ value: 1, label: 'Tipik Anjin' }, { value: 2, label: 'Atipik Anjin' },
                                { value: 3, label: 'Anjinal Olmayan Ağrı' }, { value: 4, label: 'Asimptotik' }]}
                            />
                        </View>
                        <ValidationInput
                            disabled={disabled}
                            validator={NumberValidator}
                            placeholder={'Tansiyon (mmHg)'}
                            value={this.state.restingBloodPressure}
                            onChangeText={(val) => this.setState({ restingBloodPressure: val })}
                        />
                        <ValidationInput
                            disabled={disabled}
                            validator={NumberValidator}
                            placeholder={'Serum Kolestrol (mg/dl)'}
                            value={this.state.serumCholestrol}
                            onChangeText={(val) => this.setState({ serumCholestrol: val })}
                        />
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                placeholder={{ label: 'Açlık Kan Şekeri > 120mg/dl?', value: null }}
                                disabled={disabled}
                                value={this.state.fastingBloodSugar}
                                onValueChange={(value) => this.setState({ fastingBloodSugar: value })}
                                items={[{ value: 0, label: 'Hayır' }, { value: 1, label: 'Evet' }]}
                            />
                        </View>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                placeholder={{ label: 'EKG', value: null }}
                                disabled={disabled}
                                value={this.state.restingECG}
                                onValueChange={(value) => this.setState({ restingECG: value })}
                                items={[{ value: 0, label: 'Normal' }, { value: 1, label: 'ST-T Dalga Anormalliği' }, { value: 2, label: 'Sol Ventrikül Hiperrofisi' }]}
                            />
                        </View>
                        <ValidationInput
                            disabled={disabled}
                            validator={NumberValidator}
                            placeholder={'Maksimum Kalk Atış Hızı'}
                            value={this.state.maxHeartRate}
                            onChangeText={(val) => this.setState({ maxHeartRate: val })}
                        />
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                placeholder={{ label: 'Egzersize Bağlı Anjin', value: null }}
                                disabled={disabled}
                                value={this.state.exerciseInducedAngina}
                                onValueChange={(value) => this.setState({ exerciseInducedAngina: value })}
                                items={[{ value: 0, label: 'Hayır' }, { value: 1, label: 'Evet' }]}
                            />
                        </View>
                        <ValidationInput
                            disabled={disabled}
                            validator={NumberValidator}
                            placeholder={'ST Depresyonu'}
                            value={this.state.stDepression}
                            onChangeText={(val) => this.setState({ stDepression: val })}
                        />
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                placeholder={{ label: 'En Yüksek Egzersiz ST Segmenti', value: null }}
                                disabled={disabled}
                                value={this.state.peakExerciseSTSegment}
                                onValueChange={(value) => this.setState({ peakExerciseSTSegment: value })}
                                items={[{ value: 1, label: 'Yukarı Doğru' }, { value: 2, label: 'Düz' }, { value: 3, label: 'Aşağı Doğru' }]}
                            />
                        </View>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                placeholder={{ label: 'Floroskopi ile Renklendirilmiş Ana Damarların Sayısı', value: null }}
                                disabled={disabled}
                                value={this.state.numberOfMajorVessel}
                                onValueChange={(value) => this.setState({ numberOfMajorVessel: value })}
                                items={[{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }]}
                            />
                        </View>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                placeholder={{ label: 'Thalsemi', value: null }}
                                disabled={disabled}
                                value={this.state.thal}
                                onValueChange={(value) => this.setState({ thal: value })}
                                items={[{ value: 3, label: 'Normal' }, { value: 6, label: 'Sabit Kusur' }, { value: 7, label: 'Tersinir Kusur' }]}
                            />
                        </View>
                    </View>
                    {disabled ? <View></View> :
                        <IndicatorContext.Consumer >
                            {({ showLoader }) => (
                                <View style={themedStyle.buttonContainer}>
                                    <Button
                                        style={themedStyle.buyButton}
                                        textStyle={textStyle.button}
                                        size='large'
                                        onPress={() => this.onSave(showLoader)}>
                                        Kaydet
                                </Button>
                                </View>
                            )}
                        </IndicatorContext.Consumer>}
                    <Result
                        success={this.state.success}
                        isModalVisible={this.state.isModalVisible}
                        onClosePress={() => this.onCloseModalPress(this)}>
                    </Result>
                </View>
            </Showcase>
        );
    }

}

export const AnalyzeForm = withStyles(AnaylzeFormComponent, (theme: ThemeType) => ({
    content: {
        flex: 1,
    },
    formContainer: {
        justifyContent: 'flex-start',
        borderRadius: 4,
        padding: 7,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        marginTop: 5,
        padding: 7,
        backgroundColor: theme['background-basic-color-1'],
    },
    picker: {
        marginBottom: 5,
        padding: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#EDF1F7',
        marginBottom: 5,
        color: theme['background-basic-color-2'],
        backgroundColor: theme['background-basic-color-2'],
        borderRadius: 4
    },
    buyButton: {},
}));
