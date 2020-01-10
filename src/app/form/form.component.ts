import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {FormService} from './form.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var StripeCheckout: any;
@Component({
  selector: 'app-snack-bar-component-error',
  templateUrl: 'snack-bar-component.html',
})
export class SnackBarErrorComponent {}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userForm: any;
  userForm2: any;
  handler: any;
  stripe: any;
  cardElement: any;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private formService: FormService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.formBuilder.group({
      fiscalNum: ['', [Validators.required, Validators.minLength(13),  Validators.maxLength(13)]],
      avisNum: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    });
    this.calcLevel(33333,0)

  }

  ngOnInit() {
    this.configHandler();
  }

  saveUser() {
    console.log('nop');
    this.formService.getData(this.userForm.value.fiscalNum, this.userForm.value.avisNum).subscribe((res) => {
      if ((<any>res).errorMessage) {
        this.openSnackBar();
      } else {
        console.log(res);
        this.initForm2((<any>res).body);
      }
    });

  }

  saveUserToDB() {
    console.log('nop');
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarErrorComponent, {
      duration: 5000,
    });
  }

  initForm2(user) {
    console.log(user);
    this.userForm2 = this.formBuilder.group({
      firstName: [{value: user.firstName, disabled: true}],
      lastName: [{value: user.lastName, disabled: true}],
      grossRevenue: [{value: user.grossRevenue, disabled: true}],
      numPeople: [{value: user.numPeople, disabled: true}],
      email: ['', [Validators.required, Validators.email] ],
      question1: ['', [Validators.required, Validators.requiredTrue]],
      question2: ['', [Validators.required, Validators.requiredTrue]],
      question3: ['', [Validators.required, Validators.requiredTrue]]
    });
    this.userForm2.valueChanges.subscribe(x => this.configHandler());
  }
  private configHandler() {
    this.stripe = (window as any).Stripe('pk_test_qb9hPAew57PDqFM0fIjBFgN5');
    const elements = this.stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.cardElement = elements.create('card', { style });
    this.cardElement.mount('#card-element');
  }

  submitPayement() {
    this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
      billing_details: {
        email: 'cyril@fertec.fr',
      },
    }).then((result) => {
      // Handle result.error or result.paymentMethod
      console.log(this.userForm2);
      this.formService.createStripeUser(
        this.userForm2.value.email,
        result.paymentMethod.id,
        this.userForm2.controls.firstName.value,
        this.userForm2.controls.lastName.value,
        this.userForm2.controls.grossRevenue.value,
        this.calcLevel(this.userForm2.controls.grossRevenue.value, this.userForm2.controls.numPeople.value),
        this.userForm2.controls.numPeople.value
      ).subscribe(res => {
        this.router.navigate(['/login?email= ' + this.userForm2.value.email]);
      });

    });
  }
  calcLevel(revenue, people) {
    const json = {
      "very low": [14879, 21760, 26170, 30572, 34993],
      "low": [19074, 27896, 33547, 39192, 44860],
      "moderate": [27706, 44124, 50281, 56438, 68752],
      "hight": [27706, 44124, 50000, 56438, 81066],
    }
     if( revenue <= json['very low'][people] ) {
      return 'very low'
    } else if(revenue <= json['low'][people] ) {
      return 'low'
    } else if(revenue <= json['moderate'][people] ) {
      return 'moderate'
    }else {
      return 'hight'
    }


  }

}
