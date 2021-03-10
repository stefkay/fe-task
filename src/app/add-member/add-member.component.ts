import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { ITeam } from '../../interfaces/ITeam';
import { IOffice } from '../../interfaces/IOffice';
import { ToolsService } from '../../services/tools.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMember } from '../../interfaces/IMember';
import { Member } from '../members/Member';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  teams: ITeam[] = [];
  offices: IOffice[] = [];
  newMember = new Member('', '', '', '', '', '' );

  constructor(public formRef: MatDialogRef<AddMemberComponent>,
              private apiService: ApiService,
              private tools: ToolsService) {
  }

  ngOnInit(): void {
    this.apiService.getTeams().subscribe((teams: any) => {
      this.teams = this.tools.mapTeamsData(teams);
    });
    this.apiService.getOffices().subscribe((offices: any) => {
      this.offices = this.tools.mapOfficeData(offices);
    });
  }

  close(): void {
    this.formRef.close();
  }

  onSubmit(): void{
    this.apiService.addMember(this.newMember);
    this.close();
  }
}
