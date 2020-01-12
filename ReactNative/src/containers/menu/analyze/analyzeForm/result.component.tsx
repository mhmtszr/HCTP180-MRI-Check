import React from 'react';
import {
    View,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import {
    ThemeType,
    withStyles,
    ThemedComponentProps,
} from '@kitten/theme';
import {
    List,
    Text, Button, Avatar
} from '@kitten/ui';
import Modal from "react-native-modal";

// interface State {
//     isModalVisible: boolean;
// }

interface ComponentProps {
    isModalVisible: boolean;
    success: boolean;
    onClosePress: () => void;
}

export type AboutProps = ThemedComponentProps & ComponentProps;

class ResultComponent extends React.Component<AboutProps> {

    state = {
        isVisible: false
    }

    private renderModalElement = (): React.ReactElement => {
        const { themedStyle, onClosePress } = this.props;
        return (
            <View style={themedStyle.content}>
                {this.props.success ?
                    <View>
                        <Text style={themedStyle.contentTitle}>MR Taraması Gereklidir!</Text>
                        <Avatar style={{ margin: 8 }} size='large' source={require('../../../../assets/images/source/success.png')} />
                    </View>
                    :
                    <View>
                        <Text style={themedStyle.contentTitle}>MR Taramasına Gerek Yoktur!</Text>
                        <Avatar style={{ margin: 8 }} size='large' source={require('../../../../assets/images/source/failure.png')} />
                    </View>
                }

                <Button onPressOut={onClosePress} >Kapat</Button>
            </View>
        );
    };

    public render(): React.ReactNode {

        const { themedStyle, isModalVisible, onClosePress } = this.props;

        return (
            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={onClosePress}
                swipeDirection={['down', 'up']}>
                {this.renderModalElement()}
            </Modal>
        );
    }
}

export const Result = withStyles(ResultComponent, (theme: ThemeType) => ({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
}));
