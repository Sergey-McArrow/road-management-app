import { z } from 'zod'

export const TGradeType = z.enum([
  'gw',
  'twgeb',
  'twofs',
  'twrio',
  'twsub',
  'tweben',
  'RISS',
  'ONA',
  'ABP',
  'AMA',
  'BIN',
  'FLI',
  'KAN',
  'MUL',
  'SPT',
])

export type TGradeType = z.infer<typeof TGradeType>

export const getGradeColor = (grade: number): string => {
  switch (true) {
    case grade < 1.5:
      return '#3388ff'
    case grade < 2.5:
      return '#90EE90'
    case grade < 3.5:
      return '#006400'
    case grade < 4.5:
      return '#FFFF00'
    default:
      return '#FF0000'
  }
}

export const gradeTypeLabels: Record<TGradeType, string> = {
  gw: 'Overall Grade',
  twgeb: 'Building Grade',
  twofs: 'Surface Grade',
  twrio: 'RIO Grade',
  twsub: 'Substrate Grade',
  tweben: 'Level Grade',
  RISS: 'RISS Grade',
  ONA: 'ONA Grade',
  ABP: 'ABP Grade',
  AMA: 'AMA Grade',
  BIN: 'BIN Grade',
  FLI: 'FLI Grade',
  KAN: 'KAN Grade',
  MUL: 'MUL Grade',
  SPT: 'SPT Grade',
}
