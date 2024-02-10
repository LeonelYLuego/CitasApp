import { Component, OnInit } from '@angular/core';
import { IMember } from '../_models/imember';
import { IUser } from '../_models/iuser';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  member?: IMember;
  user: IUser | null = null;

  constructor(
    private accountsService: AccountService,
    private membersService: MembersService
  ) {
    this.accountsService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => (this.user = user),
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.membersService.getMember(this.user.username).subscribe({
      next: (member) => {
        console.log(member);
        this.member = member;
      },
    });
  }
}
