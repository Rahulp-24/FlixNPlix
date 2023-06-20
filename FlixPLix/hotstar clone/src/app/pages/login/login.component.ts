import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
// import { UserServiceService } from 'src/app/service/user-service.service';
import { UserServiceService } from '../../../app/service/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserServiceService) { }

  loginData: any = [];
  errorMessage: any;
  loginEmailCheck: any = "http://localhost:8081/email/";

  subscriptionDetailsUrl: any = "http://localhost:8081/Sub/"
  subscriptionData: any = [];

  dateTime = new Date()

  ngOnInit(): void {
    this.userService.userDetails.logedIn = 0

  }
  loginForm = this.fb.group({
    userEmail: [null, Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$')])],
    userPassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9_]+')])]
  })

  goSignUp() {
    this.router.navigate(['/signup']);
  }
  async getMeLogedIn() {
    this.loginEmailCheck = "http://localhost:8081/email/";

    let p = new Promise((res) => {
      this.makeLogin().subscribe(data => {
        this.loginData = data
        res('');
      });

    });
    await p;
    

    if (this.loginData.length < 1) {
      this.errorMessage = "Email is not registered";
      this.loginEmailCheck = "http://localhost:8081/email/";
    }
    else if (this.loginData[0].emailId == this.loginForm.value.userEmail && this.loginData[0].password == this.loginForm.value.userPassword) {
      this.errorMessage = "Login succefull"
      this.userService.userDetails.userId = this.loginData[0].userid;
      this.userService.userDetails.userName = this.loginData[0].firstName;
      this.userService.userDetails.userEmail = this.loginData[0].emailId;
      this.userService.userDetails.logedIn = 1;

      this.getSubscriptionD();
      setTimeout(() => { this.router.navigate(['/home']), 2000 })


      this.loginEmailCheck = "http://localhost:8081/email/";

    }
    else {
      this.errorMessage = "wrong password";
      this.loginEmailCheck = "http://localhost:8081/email/";
    }

  }
  makeLogin() {
    this.loginEmailCheck = this.loginEmailCheck + this.loginForm.value.userEmail;
    return this.http.get(this.loginEmailCheck);
  }

//  Checking weather user has already subscribed to any plan when user login.
  async getSubscriptionD() {
    this.subscriptionDetailsUrl = this.subscriptionDetailsUrl + this.userService.userDetails.userId;
    
    let p = new Promise((res) => {
      this.getSubscriptionStatus().subscribe(data => {
        this.subscriptionData = data;
        res('');
      });

    });
    await p;
    this.subscriptionDetailsUrl = "http://localhost:8081/Sub/";

    if(this.subscriptionData.length >1){
    this.userService.userDetails.planStaus = this.subscriptionData[0].plan;
    this.userService.userDetails.validityMin = this.subscriptionData[0].validityMin;
    this.userService.userDetails.validityHours = this.subscriptionData[0].validityHours;
    this.userService.userDetails.subId = this.subscriptionData[0].sId;
  }
  }

  getSubscriptionStatus() {
    return this.http.get(this.subscriptionDetailsUrl);
  }

}
