import { LayoutMenuItemData } from '@src/components/common';

export type AnalyzeData = LayoutMenuItemData;

export interface AnalyzeContainerData extends AnalyzeData {
  route: string;
  previouseNavigation: string;
}
