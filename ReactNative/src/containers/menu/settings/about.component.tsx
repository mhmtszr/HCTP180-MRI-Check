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
    Text, Button
} from '@kitten/ui';
import Modal from "react-native-modal";

// interface State {
//     isModalVisible: boolean;
// }

interface ComponentProps {
    isModalVisible: boolean;
    onClosePress: () => void;
}

export type AboutProps = ThemedComponentProps & ComponentProps;

class AboutComponent extends React.Component<AboutProps> {

    state = {
        isVisible: false
    }

    private renderModalElement = (): React.ReactElement => {
        const { themedStyle, onClosePress } = this.props;
        return (
            <View style={themedStyle.content}>
                <Text style={themedStyle.contentTitle}>Hakkında</Text>
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

export const About = withStyles(AboutComponent, (theme: ThemeType) => ({
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
