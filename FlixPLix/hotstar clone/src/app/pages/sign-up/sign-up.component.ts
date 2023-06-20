import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
// import { UserServiceService } from 'src/app/service/user-service.service';
import { UserServiceService } from '../../../app/service/user-service.service';
import { User } from '../../../app/user';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User= new User();
  constructor(private fb:FormBuilder ,private router:Router, private userService : UserServiceService, private http: HttpClient) { }

  checkEmailUnique:any ="http://localhost:8081/email/";
  // emailUnique :any;
  errorMessage ="";
  emailData:any=[];
  ngOnInit(): void {
    
  }

  signUpForm = this.fb.group({
    firstName:["",Validators.required],
    lastName:["",Validators.required],
    userEmail:["",Validators.compose([Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$')])],
    userPassword:["", Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern('[a-zA-Z0-9_]+')])],
    
  }
  
  )

  async RegisterUser(){
    
    this.user.firstName=this.signUpForm.value.firstName?.toString();
    this.user.lastName=this.signUpForm.value.lastName?.toString();
    this.user.emailId=this.signUpForm.value.userEmail?.toString();    
    this.user.password=this.signUpForm.value.userPassword?.toString();
    this.checkEmailUnique = this.checkEmailUnique + this.user.emailId;
    
    let p = new Promise((res)=>{
      this.checkEmail().subscribe(data=>{
        this.emailData=data;
        res('');
      });
    });
    await p;
    if(this.emailData.length<1){
      this.userService.addUser(this.user).subscribe();
      
      this.errorMessage="Registerd succesfully redirecting to login page"
      setTimeout(()=>{this.router.navigate(['/login']),2000});

    
    }
    else{
      
      this.errorMessage = "This Email id already exists";
    }
    this.checkEmailUnique = "http://localhost:8081/email/";
    
    
    
  }
  checkEmail()  {
    
    return this.http.get(this.checkEmailUnique);
  }
  
  goToLogin(){
    this.router.navigate(['/login'])

  }
}

