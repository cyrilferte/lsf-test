import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LoginService } from './login.service';

export interface User {
  firstName: string;
  lastName: number;
  peopleNum: number;
  grossRevenue: string;
  level: string;
  subscribe: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user: any;
  users: User[];
  displayedColumns = ['Prénom', 'Nom', 'Email', 'Revenue', 'Level', 'Subscribe'];
  constructor(private route: ActivatedRoute, private userService: LoginService,  private router: Router) { }

  ngOnInit() {

    if (this.route.snapshot.queryParamMap.get('email')) {
      this.userService.getDataFromEmail(this.route.snapshot.queryParamMap.get('email')).subscribe(resp => {
        this.user = (<any>resp).body.item;
      });
    } else if (this.route.snapshot.queryParamMap.get('adminEmail') && this.route.snapshot.queryParamMap.get('password')) {
      this.userService.getData(this.route.snapshot.queryParamMap.get('adminEmail'), this.route.snapshot.queryParamMap.get('password')).subscribe(resp => {
        console.log(resp);
        this.users = (<any>resp).body.items;
      });
    } else {
      this.router.navigate(['']);
    }


  }
  redirectToLink(link){
    window.open(link, "_blank");
  }

}
