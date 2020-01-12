import React from 'react';
import {
    View, AsyncStorage, Alert,
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from '@kitten/theme';
import axios from "axios"
import { Button, Text } from 'react-native-ui-kitten/ui';
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
        age: '',
        sex: null,
        chestPainType: null,
        restingBloodPressure: '',
        serumCholestrol: '',
        fastingBloodSugar: '',
        restingECG: null,
        maxHeartRate: '',
        exerciseInducedAngina: null,
        stDepression: '',
        peakExerciseSTSegment: null,
        numberOfMajorVessel: null,
        thal: null,
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
        /**
         * Girilen değerlerin sunucuya gönderilmesi ve analizi
         */
        loader(true, 'Kaydediliyor...');
        let thizz = this;
        AsyncStorage.getItem('userInfo').then(result => {
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
                    url: 'http://mricheck.calgan.engineer/analyze.php',
                    data: bodyFormData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(function (response) {
                    //handle success
                    loader(false, "");
                    const prediction = response.data.prediction;
                    thizz.setState({ success: prediction == "0" ? false : true });
                    thizz.setState({ isModalVisible: true });
                }).catch(function (response) {
                    //handle error
                    Alert.alert('Hata!', 'Bir sorun oluştu: ' + response, [{ text: 'Tamam', onPress: () => loader(false, "") }]);
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
                            label={'Yaş'}
                            value={this.state.age}
                            onChangeText={(val) => this.setState({ age: val })}
                        />

                        <Text style={themedStyle.labelText}>Cinsiyet</Text>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                disabled={disabled}
                                placeholder={{ value: null, label: 'Lütfen birini seçiniz...' }}
                                value={this.state.sex}
                                onValueChange={(value) => this.onSelectionChange({ sex: value })}
                                items={[{ value: 1, label: 'Erkek' }, { value: 0, label: 'Kadın' }]}
                            />
                        </View>

                        <Text style={themedStyle.labelText}>Ağrı türü</Text>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                disabled={disabled}
                                placeholder={{value:null,label:'Lütfen birini seçiniz...'}}
                                value={this.state.chestPainType}
                                onValueChange={(value) => this.setState({ chestPainType: value })}
                                items={[{ value: 1, label: 'Tipik Anjin' }, { value: 2, label: 'Atipik Anjin' },
                                { value: 3, label: 'Anjinal Olmayan Ağrı' }, { value: 4, label: 'Asimptotik' }]}
                            />
                        </View>

                        <ValidationInput
                            disabled={disabled}
                            validator={NumberValidator}
                            label={'Tansiyon (mmHg)'}
                            value={this.state.restingBloodPressure}
                            onChangeText={(val) => this.setState({ restingBloodPressure: val })}
                        />

                        <ValidationInput
                            disabled={disabled}
                            validator={NumberValidator}
                            label={'Serum Kolestrol (mg/dl)'}
                            value={this.state.serumCholestrol}
                            onChangeText={(val) => this.setState({ serumCholestrol: val })}
                        />

                        <Text style={themedStyle.labelText}>Açlık Kan Şekeri > 120mg/dl?</Text>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                disabled={disabled}
                                placeholder={{value:null,label:'Lütfen birini seçiniz...'}}
                                value={this.state.fastingBloodSugar}
                                onValueChange={(value) => this.setState({ fastingBloodSugar: value })}
                                items={[{ value: 0, label: 'Hayır' }, { value: 1, label: 'Evet' }]}
                            />
                        </View>

                        <Text style={themedStyle.labelText}>EKG</Text>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                disabled={disabled}
                                placeholder={{value:null,label:'Lütfen birini seçiniz...'}}
                                value={this.state.restingECG}
                                onValueChange={(value) => this.setState({ restingECG: value })}
                                items={[{ value: 0, label: 'Normal' }, { value: 1, label: 'ST-T Dalga Anormalliği' }, { value: 2, label: 'Sol Ventrikül Hiperrofisi' }]}
                            />
                        </View>

                        <ValidationInput
                            disabled={disabled}
                            validator={NumberValidator}
                            label={'Maksimum Kalk Atış Hızı'}
                            value={this.state.maxHeartRate}
                            onChangeText={(val) => this.setState({ maxHeartRate: val })}
                        />

                        <Text style={themedStyle.labelText}>Egzersize Bağlı Anjin</Text>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                disabled={disabled}
                                placeholder={{value:null,label:'Lütfen birini seçiniz...'}}
                                value={this.state.exerciseInducedAngina}
                                onValueChange={(value) => this.setState({ exerciseInducedAngina: value })}
                                items={[{ value: 0, label: 'Hayır' }, { value: 1, label: 'Evet' }]}
                            />
                        </View>

                        <ValidationInput
                            style={themedStyle.validationInput}
                            disabled={disabled}
                            validator={NumberValidator}
                            label={'ST Depresyonu'}
                            value={this.state.stDepression}
                            onChangeText={(val) => this.setState({ stDepression: val })}
                        />

                        <Text style={themedStyle.labelText}>En Yüksek Egzersiz ST Segmenti</Text>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                disabled={disabled}
                                placeholder={{value:null,label:'Lütfen birini seçiniz...'}}
                                value={this.state.peakExerciseSTSegment}
                                onValueChange={(value) => this.setState({ peakExerciseSTSegment: value })}
                                items={[{ value: 1, label: 'Yukarı Doğru' }, { value: 2, label: 'Düz' }, { value: 3, label: 'Aşağı Doğru' }]}
                            />
                        </View>

                        <Text style={themedStyle.labelText}>Floroskopi ile Renklendirilmiş Ana Damarların Sayısı</Text>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                disabled={disabled}
                                placeholder={{value:null,label:'Lütfen birini seçiniz...'}}
                                value={this.state.numberOfMajorVessel}
                                onValueChange={(value) => this.setState({ numberOfMajorVessel: value })}
                                items={[{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }]}
                            />
                        </View>

                        <Text style={themedStyle.labelText}>Thalsemi</Text>
                        <View style={themedStyle.pickerContainer}>
                            <RNPickerSelect
                                style={themedStyle.picker}
                                disabled={disabled}
                                placeholder={{value:null,label:'Lütfen birini seçiniz...'}}
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
        marginBottom: 7,
        padding: 10,
    },
    validationInput: {
        marginBottom: 7,
    },
    labelText: {
        marginBottom: 4,
        color: '#8F9BB3'
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
