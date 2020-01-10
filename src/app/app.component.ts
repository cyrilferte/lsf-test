import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lsf-test-front';
  loginForm: any;

  constructor(public dialog: MatDialog) {}

  openDialog(type): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {type: type}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  loginForm: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    console.log(data)
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  redirectUser(type) {
    if(type== 'user'){
      this.router.navigate(['/login'], { queryParams: {email: this.loginForm.value.email}} );
    } else if (type=='admin'){

      this.router.navigate(['/login'], { queryParams: {adminEmail: this.loginForm.value.email, password: this.loginForm.value.password}} );
    }

  }

}
