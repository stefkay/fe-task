import { Injectable } from '@angular/core';
import { IOffice } from '../interfaces/IOffice';
import { IMember } from '../interfaces/IMember';
import { ITeam } from '../interfaces/ITeam';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  constructor(private _snackBar: MatSnackBar) {
  }

  mapMemberData(teams: any[], offices: IOffice[], rawMemberData: any[]): IMember[] {
    const members: IMember[] = [];
    rawMemberData.forEach((item: object) => {
      const member = this.mapMember(teams, offices, item);
      members.push(member);
    });

    members.sort((a: IMember, b: IMember) => {
      return (new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    });

    return members;
  }

  mapOfficeData(rawOfficeData: any[]): IOffice[] {
    const offices = [];
    rawOfficeData.forEach(office => {
      offices.push({
        name: office.name,
        _id: office._id
      });
    });
    return offices;
  }

  mapTeamsData(rawTeamsData: any[]): ITeam[] {
    const teams = [];
    rawTeamsData.forEach(team => {
      teams.push({
        name: team.name,
        _id: team._id,
        office: team.office
      });
    });
    return teams;
  }

  mapMember(teams, offices, memberData): IMember {
    const teamId = memberData['team'];
    const team = teams.filter(t => t._id === teamId)[0];
    const officeId = team['office'];
    const office = offices.filter(o => o._id === officeId)[0];

    return {
      team: {name: team['name'], _id: teamId, office: officeId},
      office: {name: office['name'], _id: officeId},
      name: memberData['name'],
      email: memberData['email'],
      image: memberData['image'] || '',
      createdAt: memberData['createdAt'],
      startDate: memberData['startDate'],
      calculatedStatus: memberData['calculatedStatus'],
      phone: memberData.phone,
      _id: memberData['_id']
    };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
