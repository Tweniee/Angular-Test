import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  image: File;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  editableData: any;
  baseUrl = 'http://localhost:5000';
  id="7";
  private subject = new Subject<any>();
  isEdit = false;
  sendMessage(value: any) {
    this.subject.next(value);
  }

  getMessage() {
    return this.subject.asObservable();
  }
  constructor(private http: HttpClient) {}

  createUser(body: FormData) {
    const formData = new FormData();
    formData.append('firstName', body['firstName']);
    formData.append('lastName', body['lastName']);
    formData.append('email', body['email']);
    formData.append('phoneNumber', body['phoneNumber']);
    formData.append('profileImage', body['image']);

    const url = this.baseUrl + '/api/users';
    return this.http.post(url, formData);
  }

  getAllData() {
    const url = this.baseUrl + '/api/users';
    return this.http.get(url);
  }

  deleteUser(id: string) {
    const url = this.baseUrl + '/api/users/' + id;
    return this.http.delete(url);
  }

  getUserData() {
    const url = this.baseUrl + '/api/users/' + this.id;
    return this.http.get(url);
  }
}
