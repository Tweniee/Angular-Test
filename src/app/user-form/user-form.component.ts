import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { emitter } from '../user-table/user-table.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userForm: FormGroup;
  editData!: emitter;
  data: any;
  showImage = false
  baseUrl = 'http://localhost:5000';
  @Output() isViewTable: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder, private service: UserService) {
  }

  ngOnInit() {
    if (this.service.isEdit) {
      this.showImage = true
      console.log(this.service.editableData);
      this.userForm = this.formBuilder.group({
        firstName: [this.service.editableData.firstName, Validators.required],
        lastName: [this.service.editableData.lastName, Validators.required],
        email: [
          this.service.editableData.email,
          [Validators.required, Validators.email],
        ],
        phoneNumber: [
          this.service.editableData.phoneNumber,
          Validators.required,
        ],
        image: [this.service.editableData.profileImage],
      });
      console.log(this.userForm.value);
    } else {
      this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        image: [''],
      });
    }
  }

  get image(){
    return this.userForm.get("image").value 
  }
  submitForm() {
    if (this.userForm.valid) {
      // Handle form submission here
      this.service.createUser(this.userForm.value).subscribe((item: any) => {
        console.log('Success', item);
        this.userForm.reset();
        this.showList();
      });
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.userForm.patchValue({
      image: file,
    });
    this.showImage = false
  }
  showList() {
    this.isViewTable.emit(true);
  }
}
