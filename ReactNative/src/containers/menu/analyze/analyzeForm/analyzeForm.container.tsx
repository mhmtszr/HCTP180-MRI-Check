import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { AnalyzeForm } from './analyzeForm.component';
import { AnalyzeContainerData } from '../type';

interface State {
    selectedLayoutIndex: number;
}

export class AnalyzeFormContainer extends React.Component<NavigationStackScreenProps, State> {

    public state: State = {
        selectedLayoutIndex: 0,
    };

    componentDidMount() {
        console.log("hüloooo")
    }

    private navigationKey: string = 'AnalyzeContainer';

    private onSave = () => {
        this.props.navigation.goBack();
    };

    public render(): React.ReactNode {
        return (
            <AnalyzeForm
                item={this.props.navigation.state.params.item}
                data={this.props.navigation.state.params.data}
                onSave={this.onSave}
            ></AnalyzeForm>
        );
    }
}
