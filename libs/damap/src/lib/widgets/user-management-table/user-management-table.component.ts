import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { User } from '../../domain/user';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'damap-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.css'],
})
export class UserManagementTableComponent implements OnInit {
  users: User[] = [];

  constructor(private backendService: BackendService) {}
  displayedColumns: string[] = [
    'userId',
    'displayName',
    'username',
    'apiKeyCount',
    'roles',
    'actions',
  ];

  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(pageIndex: number): void {
    this.backendService
      .getUserListPaginated(pageIndex, this.pageSize)
      .subscribe(response => {
        this.users = response.users;
        this.totalUsers = response.totalElements;
      });
  }

  resetApiKeys(user: User): void {
    this.backendService.resetApiKey(user.userId).subscribe(() => {
      this.currentPage = 0;
      this.loadUsers(this.currentPage);
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(this.currentPage);
  }
}
