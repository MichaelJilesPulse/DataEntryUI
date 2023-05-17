export enum LongitudinalType {
  SCREEN = 1,
  REGISTRATION = 2,
  START,
  END,
  FOLLOWUP,
  START_FOLLOWUP_END,
  FOLLOWUP_END
}

export const FOLLOWUP_TYPES = [LongitudinalType.FOLLOWUP, LongitudinalType.FOLLOWUP_END, LongitudinalType.START_FOLLOWUP_END];
