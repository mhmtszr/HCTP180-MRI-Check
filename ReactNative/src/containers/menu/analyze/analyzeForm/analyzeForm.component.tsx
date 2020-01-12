import React from 'react';
import {
    View,
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from '@kitten/theme';
import { Button } from 'react-native-ui-kitten/ui';
import { AnalyzeContainerData } from '../type';
import { textStyle, ValidationInput } from '@src/components/common';
import { NameValidator } from '@src/core/validators';

interface ComponentProps {
    data: AnalyzeContainerData[];
    item: AnalyzeContainerData;
    onSave: () => void;
}

interface State {
    title: string;
    description: string;
}

export type AnalyzeProps = ThemedComponentProps & ComponentProps;

class AnaylzeFormComponent extends React.Component<AnalyzeProps> {

    public state: State = {
        title: '',
        description: ''
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.item != null ? this.setState(this.props.item) : false;
    }

    private onTextChange(val) {
        this.setState({ title: val })
    }

    private onSave = (): void => {
        this.props.onSave();
    };

    public render(): React.ReactNode {
        const { themedStyle, data, ...restProps } = this.props;

        return (
            <View style={themedStyle.content}>
                <View key={Math.random()} style={themedStyle.formContainer} >
                    <ValidationInput
                        disabled={false}
                        validator={NameValidator}
                        multiline={true}
                        value={this.state.title}
                        onChangeText={(val) => this.setState({ title: val })}
                    />
                    <ValidationInput
                        disabled={false}
                        validator={NameValidator}
                        multiline={true}
                        value={this.state.description}
                        onChangeText={(val) => this.setState({ description: val })}
                    />
                </View>
                <View style={themedStyle.buttonContainer}>
                    <Button
                        style={themedStyle.buyButton}
                        textStyle={textStyle.button}
                        size='large'
                        onPress={this.onSave}>
                        Kaydet
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
    buyButton: {},
}));
