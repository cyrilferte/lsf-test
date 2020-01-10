import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getDataFromEmail(email) {
    return this.http.post('https://gon6d8cld0.execute-api.eu-west-3.amazonaws.com/test/users', {
      email,
    });
  }

  getData(admin, password) {
    return this.http.post('https://gon6d8cld0.execute-api.eu-west-3.amazonaws.com/test/users', {
          admin,
          adminPassword: password
        });
    }
}
