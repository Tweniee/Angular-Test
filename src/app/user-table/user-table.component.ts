import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';

export interface emitter {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  profileImage: string;
  __v?: number;
  _id?: string;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  allData: any;
  isProfile = false;
  baseUrl = 'http://localhost:5000';
  @Output() isShowCreate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isShowEdit: EventEmitter<emitter> = new EventEmitter<emitter>();
  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.service.getAllData().subscribe((item: any) => {
      this.allData = item.body;
      console.log(this.allData);
    });
  }
  delete(id: string) {
    this.service.deleteUser(id).subscribe((item) => {
      console.log(item);
      this.getAllData();
    });
  }
  edit(data: emitter) {
    delete data.__v;
    delete data._id;
    this.service.editableData = data;
    this.isShowCreate.emit(true);
    this.service.isEdit = true;
  }
  showCreate() {
    this.isShowCreate.emit(true);
  }
  showProfile(id:string){
    this.service.id = id
    this.isProfile = true;
  }
}
