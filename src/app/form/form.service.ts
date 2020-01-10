import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getData(fiscalNum, avisNum) {
    return this.http.post('https://gon6d8cld0.execute-api.eu-west-3.amazonaws.com/test/impot', {
      fiscalNum,
      avis: avisNum
    });
  }

   createStripeUser(email, paymentMethod, firstName, lastName, grossRevenue, level, peopleNum) {
    return this.http.put('https://gon6d8cld0.execute-api.eu-west-3.amazonaws.com/test/users', {
          email,
            firstName,
            lastName,
              grossRevenue ,
               level     ,
                peopleNum,
                paymentMethod
        });
    }

}
