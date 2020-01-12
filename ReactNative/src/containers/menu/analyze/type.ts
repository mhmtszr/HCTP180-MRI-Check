import { LayoutMenuItemData } from '@src/components/common';

export type AnalyzeData = LayoutMenuItemData;

export interface AnalyzeContainerData extends AnalyzeData {
  route: string;
  previouseNavigation: string;
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
}
