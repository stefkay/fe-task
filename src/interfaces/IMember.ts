import { ITeam } from './ITeam';
import { IOffice } from './IOffice';

export interface IMember {
  name: string;
  email: string;
  image: string;
  createdAt: string;
  team: ITeam;
  startDate?: string;
  office: IOffice;
  phone: string;
  calculatedStatus: string;
  _id: string;
}
