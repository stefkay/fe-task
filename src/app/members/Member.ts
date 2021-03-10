import { FormControl, Validators } from '@angular/forms';

export class Member {
  constructor(
    public name: string,
    public team: string,
    public office: string,
    public email?: string,
    public phone?: string,
    public startDate?: string
  ) {
  }
}
