import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IMember } from '../_models/imember';
import { IUser } from '../_models/iuser';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ["$event"]) unloadNotification($event: any) {
    if(this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member?: IMember;
  user: IUser | null = null;

  constructor(
    private accountsService: AccountService,
    private membersService: MembersService,
    private toastr: ToastrService
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

  updateMember() {
    console.log(this.member);
    this.toastr.success('Se ha editado');
    this.editForm?.reset(this.member);
  }
}
