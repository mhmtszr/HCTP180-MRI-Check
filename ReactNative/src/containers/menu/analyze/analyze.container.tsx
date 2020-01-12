import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Analyze } from './analyze.component';
import { routes } from './routes';
import { AnalyzeContainerData } from './type';

interface State {
    selectedLayoutIndex: number;
}

export class AnalyzeContainer extends React.Component<NavigationStackScreenProps, State> {

    public state: State = {
        selectedLayoutIndex: 0,
    };

    componentDidMount() {
        console.log("hüloooo")
    }

    private data = routes;
    private navigationKey: string = 'AnalyzeContainer';

    private onCreate = () => {
        this.props.navigation.navigate('AnalyzeForm', { data: null, item: null });
    };

    private onItemSelect = (item: AnalyzeContainerData, data: AnalyzeContainerData[]) => {
        this.props.navigation.navigate('AnalyzeForm', { data: data, item: item });
    };

    public render(): React.ReactNode {
        return (
            <Analyze
                data={this.data}
                onCreate={this.onCreate}
                onItemSelect={this.onItemSelect}
            ></Analyze>
        );
    }
}
