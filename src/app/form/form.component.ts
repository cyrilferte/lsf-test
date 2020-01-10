import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {FormService} from './form.service';
import {Router} from '@angular/router';

declare var StripeCheckout: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userForm: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private formService: FormService, private router: Router) {
    this.userForm = this.formBuilder.group({
      fiscalNum: ['', [Validators.required, Validators.minLength(13),  Validators.maxLength(13)]],
      avisNum: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    });
  }

  ngOnInit() {
  }

  saveUser() {
    console.log('nop');
    this.formService.getData(this.userForm.value.fiscalNum, this.userForm.value.avisNum).subscribe((res) => {
      if (res.errorMessage) {
        this.openSnackBar();
      } else {
        console.log(res);
        this.initForm2(res.body);
      }
    });

  }
  saveUserToDB() {
    console.log('nop');
  }



  initForm2(user) {
  }



}
