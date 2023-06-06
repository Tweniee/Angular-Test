import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { UserTableComponent } from '../user-table.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  theData: any;
  baseUrl="http://localhost:5000"
  constructor(private service: UserService,private com:UserTableComponent) {}
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.service.getUserData().subscribe((item: any) => {
      this.theData = item.body;
    });
  }
  backToList(){
    this.com.isProfile = false;
  }
}
