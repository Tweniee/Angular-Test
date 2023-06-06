import { Component } from '@angular/core';
import { emitter } from '../user-table/user-table.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  isView = false;
  editableData: any;
  viewTable(event: boolean) {
    this.isView = event;
  }
  showCreate(event: boolean) {
    this.isView = !event;
  }
}
