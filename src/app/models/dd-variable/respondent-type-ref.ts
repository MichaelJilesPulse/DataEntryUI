import {RespondentType} from '../../enums/respondent-type';

export class RespondentTypeRef {
  id: string;
  originalId: string;
  respondentType: RespondentType;
  ddVariableId: string;
  modified?: Date;
  created?: Date;
  modifiedBy: string;
  createdBy?: string;
}
