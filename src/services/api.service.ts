import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMember } from '../interfaces/IMember';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() newMemberAdded = new EventEmitter<object>();
  @Output() memberDeleted = new EventEmitter<any>();

  private baseUrl = 'https://staging.officernd.com/api/v1/organizations/assignment-demo';

  authHeaders = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODM5MzJiZTU5YmU1MjcwNGMzMGZhOSIsImlhdCI6MTYwNTg3NTc5OCwiZXhwIjoxNjM3NDExNzk4fQ.U83_KnUAkPoI65NPwGyET_4HNiF4Lvd7pl6RLHhWSFM'
  };

  constructor(private http: HttpClient) {
  }

  getMembers(): Observable<any> {
    const url = this.baseUrl + '/members';
    return this.http.get(url, {headers: this.getAuthHeaders()});
  }

  getTeams(): Observable<object> {
    const url = this.baseUrl + '/teams';
    return this.http.get(url, {headers: this.getAuthHeaders()});
  }

  getOffices(): Observable<object> {
    const url = this.baseUrl + '/offices';
    return this.http.get(url, {headers: this.getAuthHeaders()});
  }

  addMember(memberData: object) {
    const url = this.baseUrl + '/members';
    return this.http.post(url, memberData, {headers: this.getAuthHeaders()})
      .subscribe((response: object[]) => {
        const newMember = response[0];
        this.newMemberAdded.emit(newMember);
      });
  }

  deleteMember(memberId: string): Observable<any> {
    const url = this.baseUrl + '/members/' + memberId;
    return this.http.delete(url, {headers: this.getAuthHeaders()});
  }

  getAuthHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.authHeaders.Authorization);
    return headers;
  }
}
