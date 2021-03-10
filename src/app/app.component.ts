import { Component, OnInit } from '@angular/core';
import { IMember } from '../interfaces/IMember';
import { ApiService } from '../services/api.service';
import { ToolsService } from '../services/tools.service';
import { ITeam } from '../interfaces/ITeam';
import { IOffice } from '../interfaces/IOffice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  allMembers: IMember[] = [];
  teams: ITeam[] = [];
  offices: IOffice[] = [];
  members: IMember[] = [];
  selectedMembers: IMember[] = [];

  selectedLocation = '';
  selectedCompany = '';
  selectedStatus = '';
  searchedName = '';

  constructor(private apiService: ApiService,
              private tools: ToolsService) {
  }

  ngOnInit(): void {
    this.getData();
    this.apiService.newMemberAdded.subscribe(() => {
      this.getData();
    });
    this.apiService.memberDeleted.subscribe(() => {
      this.getData();
    });
  }

  getData(): void {
    this.apiService.getOffices().subscribe(
      (offices: any[]) => {
        this.offices = this.tools.mapOfficeData(offices);

        this.apiService.getTeams().subscribe(
          (rawTeams: any[]) => {
            this.teams = this.tools.mapTeamsData(rawTeams);

            this.apiService.getMembers().subscribe(
              (members: any[]) => {
                this.allMembers = this.tools.mapMemberData(rawTeams, this.offices, members);
                this.members = [...this.allMembers];
              }
            );
          }
        );
      }
    );
  }

  setFilterStatus(status: string): void {
    this.selectedStatus = status;
    this.filter();
  }

  filter(): void {
    let data = [...this.allMembers];
    if (this.selectedStatus) {
      data = data.filter(member => {
        return member.calculatedStatus === this.selectedStatus;
      });
    }

    if (this.searchedName) {
      data = data.filter(member => {
        return member.name.toLowerCase().indexOf(this.searchedName.toLowerCase()) > -1;
      });
    }

    if (this.selectedLocation) {
      data = data.filter(member => {
        return member.office.name.toLowerCase() === this.selectedLocation.toLowerCase();
      });
    }

    if (this.selectedCompany) {
      data = data.filter(member => {
        return member.team.name.toLowerCase() === this.selectedCompany.toLowerCase();
      });
    }
    this.members = data;
  }

  setSelectedRows(members: IMember[]): void {
    this.selectedMembers = members;
  }
}
