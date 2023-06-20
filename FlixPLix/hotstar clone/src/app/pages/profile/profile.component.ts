import { Component, OnInit } from '@angular/core';
// import { UserServiceService } from 'src/app/service/user-service.service';
import { UserServiceService } from '../../../app/service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserServiceService) {

   }
  userName  :any="Rahul";
  userEmail  :any;
  userPlan  :any;

  ngOnInit(): void {

    
    this.userName = this.userService.userDetails.userName;
    this.userEmail = this.userService.userDetails.userEmail;
    if(this.userService.userDetails.planStaus==""){
      this.userPlan="Not subscribed"
    }else{

      this.userPlan = this.userService.userDetails.planStaus;
    }
  }
  
  

}
