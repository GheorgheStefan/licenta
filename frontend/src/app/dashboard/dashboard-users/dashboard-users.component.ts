import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DashboardUsersService} from "./dashboard-users.service";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-dashboard-users',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    FormsModule,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgIf
  ],
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.scss'
})
export class DashboardUsersComponent implements OnInit {
  users: any = [];
  p: number = 1;

  pagedUsers: any[] = [];
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10]; // Options for items per page dropdown

  constructor(private dashboardUsersService: DashboardUsersService) {
  }

  fetchUsers(): void {
    this.dashboardUsersService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }
  changeItemsPerPage() {
    this.p = 1; // Reset page number when changing items per page
    this.paginateUsers(); // Call pagination function
  }
  paginateUsers() {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    this.pagedUsers = this.users.slice(startIndex, startIndex + this.itemsPerPage);
  }
  changeRole(id: any, role: any) {
    // console.log(id, role);
    this.dashboardUsersService.changeRole(id, role).subscribe(() => {
      this.fetchUsers();
    });
  }

}
