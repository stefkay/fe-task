import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AddMemberComponent } from '../add-member/add-member.component';
import { MatDialog } from '@angular/material/dialog';
import { IMember } from '../../interfaces/IMember';
import { ApiService } from '../../services/api.service';
import { ToolsService } from '../../services/tools.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-top-filters',
  templateUrl: './top-filters.component.html',
  styleUrls: ['./top-filters.component.scss']
})
export class TopFiltersComponent implements OnInit {
  @Input() members: IMember[];
  @Input() selected: IMember[];
  @Output() memberFiltered = new EventEmitter<string>();
  activeFilter: string;
  filterButtons = [
    {name: '', label: 'All'},
    {name: 'lead', label: 'Lead'},
    {name: 'drop-in', label: 'Drop-in'},
    {name: 'active', label: 'Active'},
    {name: 'former', label: 'Former'}];

  constructor(public dialog: MatDialog,
              private apiService: ApiService,
              private tools: ToolsService) {
  }

  ngOnInit(): void {
  }

  getMemberCountPerStatus(status: string): number {
    if (status === '') {
      return this.members.length;
    }
    return this.members.filter(member => member.calculatedStatus === status).length;
  }

  openAddMemberForm(): void {
    this.dialog.open(AddMemberComponent, {
      width: '600px'
    });
  }

  filterMembers(status: string): void {
    this.memberFiltered.emit(status);
    this.activeFilter = status;
  }

  deleteMembers(members: IMember[]) {
    const dialog = this.dialog.open(NotificationComponent, {
      width: '250px'
    });

    dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        for (let i = 0; i < members.length; i++) {
          const id = members[i]._id;
          this.apiService.deleteMember(id).subscribe((response: any) => {
            this.tools.openSnackBar(members[i].name + ' has been deleted!', '');
            this.apiService.memberDeleted.emit(response);
          });
        }
      }
    });
  }
}
