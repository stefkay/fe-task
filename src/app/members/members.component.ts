import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMember } from '../../interfaces/IMember';
import { ApiService } from '../../services/api.service';
import { ToolsService } from '../../services/tools.service';
import { Sort } from '@angular/material/sort';
import { IOffice } from '../../interfaces/IOffice';
import { ITeam } from '../../interfaces/ITeam';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  @Input() allMembers: IMember[];
  @Input() members: IMember[];
  @Input() teams: ITeam[];
  @Input() offices: IOffice[];
  @Output() selectedRows = new EventEmitter<IMember[]>();

  checked: boolean;
  selected: IMember[] = [];

  constructor(private apiService: ApiService, private tools: ToolsService) {
  }

  ngOnInit(): void {
    this.apiService.newMemberAdded.subscribe((newMember: any) => {
      const mappedMember = this.tools.mapMember(this.teams, this.offices, newMember);
      this.members.unshift(mappedMember);
    });
  }

  sortData(sort: Sort): void {
    const data = this.allMembers.slice();
    if (!sort.active || sort.direction === '') {
      this.members = data;
      return;
    }
    this.members = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case'createdAt':
          return this.compare(new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime(), isAsc);
        case 'team':
          return this.compare(a.team.name, b.team.name, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  selectRow(event, member): void {
    if (event.checked) {
      this.selected.push(member);
    } else {
      this.selected = this.selected.filter(m => m._id !== member._id);
    }
    if (this.selected.length > 0) {
      this.selectedRows.emit(this.selected);
    }
  }

  isSelected(member: IMember): boolean {
    if (this.selected.indexOf(member) > -1) {
      return true;
    }
    return false;
  }
}
