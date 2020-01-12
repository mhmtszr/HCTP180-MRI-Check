import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Analyze } from './analyze.component';
import { AnalyzeContainerData } from './type';

interface State {
    selectedLayoutIndex: number;
}

export class AnalyzeContainer extends React.Component<NavigationStackScreenProps, State> {

    public state: State = {
        selectedLayoutIndex: 0,
    };

    private navigationKey: string = 'AnalyzeContainer';

    private onCreate = (fetch) => {
        this.props.navigation.navigate('AnalyzeForm', { data: null, item: null, fetch: fetch });
    };

    private onItemSelect = (item: AnalyzeContainerData, data: AnalyzeContainerData[], fetch) => {
        this.props.navigation.navigate('AnalyzeForm', { data: data, item: item, fetch: fetch });
    };

    public render(): React.ReactNode {
        return (
            <Analyze
                data={null}
                isDataLoaded={false}
                onCreate={this.onCreate}
                onItemSelect={this.onItemSelect}
            ></Analyze>
        );
    }
}
